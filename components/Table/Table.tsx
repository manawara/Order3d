import React from 'react'
import { TableHeader } from './TableHeader'
import TableBody from './TableBody'
import { CircleEllipsis } from 'lucide-react'
import TableFooter from './TableFooter'
import DropDownDetails from '../DropDownDetails/DropDownDetails'

const dataHeader = {
  id: 'ID',
  name: 'Nazwa towaru',
  customer: 'Nazwa klienta',
  date: 'Data utworzenia',
  status: 'Status',
  action: 'Akcja',
}

const dataBody = [
  {
    id: '2',
    name: 'Podkladka',
    customer: 'Marcin Nawara',
    date: '12-02-2024',
    status: 'Zrealizowany',
  },
  {
    id: '12',
    name: 'Podkladka 2',
    customer: 'Marcin Nawara',
    date: '13-02-2024',
    status: 'zrealizowany',
  },
]

const Table = () => {
  return (
    <div className="overflow-x-auto w-full text-greenLight  text-sm p-2">
      <table className="min-w-[600px]  sm:min-w-[800px] lg:min-w-full  overflow-x-auto overflow-y-scroll">
        <TableHeader data={dataHeader} />
        <TableBody data={dataBody} action={<DropDownDetails />} />
        <TableFooter>TODO Pagination</TableFooter>
      </table>
    </div>
  )
}

export default Table
