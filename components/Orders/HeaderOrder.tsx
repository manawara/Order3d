"use client";
import { useRef } from "react";
import Button from "@/components/Button/Button";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { ModalRef } from "@/types/Modal.type";
import useOnClickOutside from "@/hook/useOnClickOutside";
import AddOrder from "./AddOrder";

const HeaderOrder = () => {
  const modalRef = useRef<ModalRef>(null);
  const handleOpenModal = () => {
    modalRef.current?.open();
  };
  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  return (
    <header>
      <div className="flex flex-col text-center items-center justify-between py-8">
        <div>
          <h2 className="text-2xl font-semibold my-4">Druk 3D zamówienia</h2>
          <p className="mt-2 text-s mb-8">
            Z łatwością zarządzaj zamówieniami druku 3D.
          </p>
        </div>
        <div>
          <Button onClick={handleOpenModal}>Dodaj zamówienie</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card
          title="Aktywne zamówienia"
          description="Aktualne zamówienia w toku"
          count={12}
        />
        <Card
          title="Zamówienia oczekujące"
          description="Zamówienia oczekujące na przetworzenie"
          count={12}
        />
        <Card
          title="Zrealizowane zamówienia"
          description="Pomyślnie wydrukowane zamówienia"
          count={12}
        />
        <Card
          title="Anulowane zamówienia"
          description="Zamówienia, które zostały anulowane"
          count={12}
        />
      </div>
      <Modal ref={modalRef}>
        <AddOrder />
      </Modal>
    </header>
  );
};

export default HeaderOrder;
