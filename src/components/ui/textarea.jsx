import { cn } from '../../lib/utils'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-foreground/35 focus:ring-2 focus:ring-ring/30',
        className,
      )}
      {...props}
    />
  )
}
