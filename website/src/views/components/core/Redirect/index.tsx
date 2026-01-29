import { redirect, RedirectType } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  path: string
}

export default function Redirect({ path }: Props) {
  useEffect(() => {
    redirect(path, RedirectType.replace)
  }, [path])

  return <></>
}
