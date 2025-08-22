import clsx from 'clsx'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'|'secondary'|'ghost'
}
export function Button({ className, variant='primary', ...props }: Props){
  const base='px-4 py-2 rounded-xl text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand'
  const styles={
    primary:'bg-brand text-white hover:bg-blue-500',
    secondary:'bg-card border hover:shadow',
    ghost:'bg-transparent hover:bg-white/60'
  }[variant]
  return <button className={clsx(base, styles, className)} {...props} />
}
