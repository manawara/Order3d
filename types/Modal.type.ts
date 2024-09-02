import { ReactNode, RefObject } from 'react'

export type ModalRef = {
  open: () => void
  close: () => void
}

export type ModalTypeProps = {
  children: ReactNode
}
