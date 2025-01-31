'use client'

import { useSettings } from '@/sanity/loader/useQuery'

import HeaderLayout from './HeaderLayout'

type Props = {
  initial: Parameters<typeof useSettings>[0]
}

export default function HeaderPreview({ initial }: Props) {
  const { data } = useSettings(initial)

  return <HeaderLayout data={data!} />
}
