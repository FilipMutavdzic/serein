import clsx from 'clsx'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>){
  return <input className={clsx('w-full rounded-xl border px-3 py-2 bg-white text-sm', props.className)} {...props} />
}
