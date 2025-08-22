import type { MDXComponents } from 'mdx/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Timer } from '@/components/Timer'

export const mdxComponents: MDXComponents = {
  h1:(p)=><h1 className="text-2xl font-semibold mb-3" {...p} />,
  h2:(p)=><h2 className="text-xl font-semibold mt-4 mb-2" {...p} />,
  p:(p)=><p className="text-base leading-relaxed mb-3 text-muted" {...p} />,
  ul:(p)=><ul className="list-disc pl-6 mb-3" {...p} />,
  li:(p)=><li className="mb-1" {...p} />,
  Card:(p:any)=><Card className="p-4" {...p} />,
  Badge:(p:any)=><Badge {...p} />,
  Timer:(p:any)=><Timer {...p} />,
}
