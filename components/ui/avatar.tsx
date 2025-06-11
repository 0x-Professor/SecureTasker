import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const Avatar = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & VariantProps<typeof avatarVariants>
>(({ className, size, ...props }, ref) => (
  <Slot className={cn(avatarVariants({ size, className }))} ref={ref} {...props} />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<React.ElementRef<"img">, React.ComponentPropsWithoutRef<"img">>(
  ({ className, ...props }, ref) => (
    <img className={cn("aspect-square h-full w-full object-cover", className)} ref={ref} {...props} />
  ),
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ className, ...props }, ref) => (
    <Slot
      className={cn(
        "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
AvatarFallback.displayName = "AvatarFallback"

export const AvatarInitials = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot
    className={cn(
      "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-medium text-foreground",
      className,
    )}
    ref={ref}
    {...props}
  />
))
AvatarInitials.displayName = "AvatarInitials"

export { Avatar, AvatarImage, AvatarFallback }
