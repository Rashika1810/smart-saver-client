import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const variants = {
  default:
    "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200",

  add:
    "bg-blue-600 text-white hover:bg-blue-700",

  edit:
    "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100",

  delete:
    "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
};

export default function Button({
  children,
  variant = "default",
  icon: Icon,
  className,
  ...props
}) {
  return (
    <button
      className={twMerge(
        clsx(
          "h-10 px-4 inline-flex items-center justify-center gap-2",
          "text-sm font-medium",
          "rounded-md",
          "transition-all duration-200",
          "active:scale-95",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className="
            h-4 w-4
            transition-transform duration-200
            group-hover:-translate-y-0.5
          "
        />
      )}

      {children}
    </button>
  );
}