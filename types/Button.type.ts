import { ReactNode, ComponentPropsWithoutRef } from 'react'

export type ButtonType = {
  children: ReactNode
} & ComponentPropsWithoutRef<'button'>
