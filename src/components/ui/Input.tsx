"use client"

import { InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="mono text-xs text-gray-400 uppercase tracking-widest">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full border rounded-sm px-3 py-2.5 text-sm outline-none transition-colors",
            "border-gray-200 focus:border-black",
            "placeholder:text-gray-300",
            error && "border-red-400 focus:border-red-500",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mono text-xs text-gray-400">{hint}</p>
        )}
        {error && (
          <p className="mono text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
export default Input
