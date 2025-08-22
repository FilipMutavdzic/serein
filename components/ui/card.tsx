import clsx from 'clsx'

export function Card(
  { className, bg, children, ...props }:
  React.HTMLAttributes<HTMLDivElement> & { bg?: string }
){
  return (
    <div
      className={clsx(
        'relative rounded-2xl overflow-hidden',
        bg ? 'text-white shadow-md bg-cover bg-center' : 'bg-card border border-black/5',
        className
      )}
      style={bg?{ backgroundImage:`url(${bg})` }:undefined}
      {...props}
    >
      {bg ? <div className="absolute inset-0 bg-black/40" /> : null}
      <div className="relative z-10 p-4">{children}</div>
    </div>
  )
}
