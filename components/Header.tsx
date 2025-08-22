import Link from 'next/link'
export function Header(){
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-bg/80 border-b">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Serein</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/pricing" className="text-muted hover:text-text">Pricing</Link>
          <Link href="/(marketing)/about" className="text-muted hover:text-text">About</Link>
        </nav>
      </div>
    </header>
  )
}
