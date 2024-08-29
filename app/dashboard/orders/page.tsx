import Card from '@/components/Card/Card'
import Orders from '@/components/Orders/Orders'
import React from 'react'

const OrdersPage = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold my-4">Druk 3D zamówienia</h2>
      <p className="mt-2 text-s mb-8">Z łatwością zarządzaj zamówieniami druku 3D.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card title="Aktywne zamówienia" description="Aktualne zamówienia w toku" count={12} />
        <Card title="Zamówienia oczekujące" description="Zamówienia oczekujące na przetworzenie" count={12} />
        <Card title="Zrealizowane zamówienia" description="Pomyślnie wydrukowane zamówienia" count={12} />
        <Card title="Anulowane zamówienia" description="Zamówienia, które zostały anulowane" count={12} />
      </div>
      <Orders />
    </div>
  )
}

export default OrdersPage
