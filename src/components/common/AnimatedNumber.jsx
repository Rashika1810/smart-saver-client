import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value = 0,
  duration = 1000,
  prefix = "",
}) {
  const [display, setDisplay] = useState(Number(value) || 0);

  const frameRef = useRef(null);
  const previousValue = useRef(Number(value) || 0);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = Number(value) || 0;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Ease Out Cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const current =
        startValue + (endValue - startValue) * eased;

      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    };

    cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return (
    <>
      {prefix}
      {display.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}
    </>
  );
}