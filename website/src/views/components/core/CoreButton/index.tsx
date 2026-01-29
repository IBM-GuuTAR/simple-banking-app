import { ReactNode } from 'react'
import { Button, ButtonProps } from '@mui/material'

import CoreLink from '@/views/components/core/CoreLink'

type Props = {
  path?: string
  href?: string
  children: ReactNode
} & ButtonProps

export default function CoreButton({ path, href, children, ...buttonProps }: Props) {
  return (
    <CoreLink path={path} href={href}>
      <Button {...buttonProps}>{children}</Button>
    </CoreLink>
  )
}
