import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-zinc-500 text-white  hover:bg-zinc-600",
  secondary: "bg-zinc-600 text-white  hover:bg-zinc-700",
  success: "bg-green-500 text-white  hover:bg-green-600",
  info: "bg-blue-600 text-white  hover:bg-blue-700",
  warning: "bg-amber-500 text-white  hover:bg-amber-600",
  danger: "bg-red-600 text-white  hover:bg-red-700",
};

export default function Button({
  children,
  icon,
  loading = false,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2
        h-10 px-4
        rounded-md
        text-sm font-normal
        whitespace-nowrap
        transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}

      <span>{children}</span>
    </button>
  );
}

