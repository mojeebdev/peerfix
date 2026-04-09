import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  bordered?: boolean
}

export default function Card({ children, className, bordered = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm bg-white",
        bordered ? "border border-gray-200" : "",
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-5 py-4 border-b border-gray-100", className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-5 py-4", className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-5 py-4 border-t border-gray-100", className)}>
      {children}
    </div>
  )
}
