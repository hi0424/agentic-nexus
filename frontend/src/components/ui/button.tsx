import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[3px] aria-invalid:ring-destructive aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-black border-2 border-primary hover:bg-transparent hover:text-[#00FFFF] hover:border-[#00FFFF]",
        destructive:
          "bg-destructive text-white border-2 border-destructive hover:bg-transparent hover:text-[#FF4466] hover:border-[#FF4466] focus-visible:ring-destructive",
        outline:
          "border-2 border-border bg-background text-foreground hover:bg-transparent hover:text-[#00FFFF] hover:border-[#00FFFF]",
        secondary:
          "bg-secondary text-black border-2 border-secondary hover:bg-transparent hover:text-[#8FFF6F] hover:border-[#8FFF6F]",
        ghost:
          "border-2 border-transparent hover:bg-transparent hover:text-[#00FFFF] hover:border-[#00FFFF]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
