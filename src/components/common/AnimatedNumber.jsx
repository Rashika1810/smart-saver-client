import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({
  value = 0,
  duration = 1200,
  prefix = "",
}) {
  const [display, setDisplay] = useState(0);
  const frame = useRef();

  useEffect(() => {
    const start = performance.now();
    const from = display;
    const to = Number(value) || 0;

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = from + (to - from) * eased;

      setDisplay(current);

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      }
    };

    frame.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      {prefix}
      {display.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}
    </>
  );
}
