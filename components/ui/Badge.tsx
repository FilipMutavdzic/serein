import clsx from 'clsx'
export function Badge({ children, className }: { children: React.ReactNode; className?: string }){
  return <span className={clsx('inline-flex items-center rounded-full bg-brand/10 text-brand px-2 py-1 text-xs', className)}>{children}</span>
}
