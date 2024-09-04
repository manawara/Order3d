"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ModalRef, ModalTypeProps } from "@/types/Modal.type";
import { X } from "lucide-react";

const Modal = forwardRef<ModalRef, ModalTypeProps>(({ children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog
      ref={dialogRef}
      className="fixed pb-2 px-8 w-[90%] sm:w-2/3 md:w-1/2 bg-greenDark border-greenLight text-greenLight border backdrop:backdrop-blur-sm"
    >
      <button onClick={() => dialogRef.current?.close()}>
        <X className="absolute top-1 right-1" size={20} />
      </button>
      {children}
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
