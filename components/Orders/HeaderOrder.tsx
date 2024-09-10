"use client";
import { useRef } from "react";
import Button from "@/components/Button/Button";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { ModalRef } from "@/types/Modal.type";
import AddOrder from "./AddOrder";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/action/order";

const HeaderOrder = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
  });

  const filterOrderByStatus = (status: string): number => {
    if (data) {
      const orders = data?.orders.filter(
        (order) => order.status === status
      ).length;
      return orders;
    }
    return 0;
  };
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Aktywne zamówienia"
          description="Aktualne zamówienia w toku"
          count={filterOrderByStatus("TODO")}
        />
        <Card
          title="Zamówienia oczekujące"
          description="Zamówienia oczekujące na przetworzenie"
          count={filterOrderByStatus("IN_PROGRESS")}
        />
        <Card
          title="Zrealizowane zamówienia"
          description="Pomyślnie wydrukowane zamówienia"
          count={filterOrderByStatus("DONE")}
        />
      </div>
      <AnimatePresence>
        <Modal ref={modalRef}>
          <AddOrder />
        </Modal>
      </AnimatePresence>
    </header>
  );
};

export default HeaderOrder;
