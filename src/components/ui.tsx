import * as React from "react";

function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  className,
  variant = "solid",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
}) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-neutral-950/20 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "solid" && "bg-neutral-950 text-white hover:bg-neutral-800",
        variant === "outline" && "border border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-100",
        variant === "ghost" && "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
        size === "default" && "h-11 px-4 text-sm",
        size === "sm" && "h-9 px-3 text-xs",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("rounded-3xl border border-neutral-200 bg-white shadow-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("p-5", className)} {...props} />;
}
