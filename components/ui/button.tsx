import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-200 hover:from-sky-600 hover:to-cyan-600 hover:shadow-lg hover:shadow-sky-300/50',
        destructive:
          'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md shadow-red-200 hover:from-red-600 hover:to-rose-600 hover:shadow-lg',
        outline:
          'border-2 border-sky-200 bg-white text-sky-600 hover:bg-sky-50 hover:border-sky-300 shadow-sm',
        secondary:
          'bg-sky-100 text-sky-700 hover:bg-sky-200 shadow-sm',
        ghost:
          'text-gray-600 hover:bg-sky-50 hover:text-sky-600',
        link: 'text-sky-600 underline-offset-4 hover:underline',
        success:
          'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg',
        warning:
          'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-9 rounded-lg gap-2 px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-lg',
        icon: 'size-10 rounded-lg',
        'icon-sm': 'size-9 rounded-lg',
        'icon-lg': 'size-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
