import clsx from 'clsx'
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>){
  return <textarea className={clsx('w-full rounded-xl border px-3 py-2 bg-white text-sm', props.className)} {...props} />
}
