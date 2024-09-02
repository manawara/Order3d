import React, { ReactNode } from 'react'

const TableFooter = ({ children }: { children: ReactNode }) => {
  return (
    <tfoot>
      <tr>
        <td colSpan={100}>{children}</td>
      </tr>
    </tfoot>
  )
}

export default TableFooter
