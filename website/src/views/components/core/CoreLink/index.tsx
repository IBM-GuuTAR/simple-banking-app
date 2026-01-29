import Link from 'next/link'
import { ReactNode } from 'react'
import { Link as MuiLink } from '@mui/material'

type Props = {
  path?: string
  href?: string
  children: ReactNode
}

export default function CoreLink({ path, href, children }: Props) {
  if (path) return <Link href={path}>{children}</Link>
  else
    return (
      <MuiLink width="100%" href={href}>
        {children}
      </MuiLink>
    )
}
