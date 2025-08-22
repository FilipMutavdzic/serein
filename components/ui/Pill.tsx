import clsx from 'clsx'
export function Pill({ children, className }: { children: React.ReactNode; className?: string }){
  return <span className={clsx('inline-flex items-center px-3 py-1 rounded-full bg-black/5 text-xs', className)}>{children}</span>
}
