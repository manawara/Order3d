'use client'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { ModalRef, ModalTypeProps } from '@/types/Modal.type'

const Modal = forwardRef<ModalRef, ModalTypeProps>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }))

  return (
    <dialog ref={dialogRef}>
      <button onClick={() => dialogRef.current?.close()}>close</button>
      {children}
    </dialog>
  )
})

Modal.displayName = 'Modal'

export default Modal
