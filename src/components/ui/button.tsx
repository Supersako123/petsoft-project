import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:  
          "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 focus-visible:bg-zinc-500",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90   ",
        outline:              
          "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900    ",
        secondary:
          "font-semibold bg-zinc-200 text-zinc-900 shadow-sm hover:bg-zinc-200/80   ",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900  ",
        link: "text-zinc-900 underline-offset-4 hover:underline ",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 text-[1.1rem] px-6",
        icon: "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }