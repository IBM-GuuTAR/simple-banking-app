import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  path: string
}

export default function Redirect({ path }: Props) {
  const router = useRouter()

  useEffect(() => {
    router.replace(path)
  }, [path, router])

  return <></>
}
