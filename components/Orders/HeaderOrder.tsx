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
import { useSession } from "next-auth/react";
import { Role } from "@/types/User.type";

const HeaderOrder = () => {
  const session = useSession();
  const user = session.data?.user;
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getOrders(),
  });

  const filterOrderByStatus = (status: string): number => {
    if (data && user?.role === Role.USER) {
      const orders = data?.orders.filter(
        (order) => order.status === status && order.user_id === user.id
      ).length;
      return orders;
    }
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
          {user?.role === Role.ADMIN && (
            <Button onClick={handleOpenModal}>Dodaj zamówienie</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          title="Zamówienia oczekujące"
          description="Zamówienia oczekujące na realizację"
          count={filterOrderByStatus("TODO")}
        />
        <Card
          title="Zamówienia aktywne"
          description="Zamówienia, które są w trakcie realizacji"
          count={filterOrderByStatus("IN_PROGRESS")}
        />
        <Card
          title="Zrealizowane zamówienia"
          description="Pomyślnie zrealizowane zamówienia"
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
