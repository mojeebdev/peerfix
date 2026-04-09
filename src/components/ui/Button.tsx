"use client"

import { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import Spinner from "./Spinner"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const variants = {
  primary:   "bg-black text-white hover:bg-gray-900 border border-black",
  secondary: "bg-transparent text-black border border-black hover:bg-gray-50",
  ghost:     "bg-transparent text-gray-500 border border-gray-200 hover:border-black hover:text-black",
}

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "mono rounded-sm transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Spinner size={12} />}
      {children}
    </button>
  )
}
