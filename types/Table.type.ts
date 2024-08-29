import { ReactNode } from 'react'

// Enum for Status
enum Status {
  Todo = 'do zrobienia',
  InProgress = 'w trakcie',
  Done = 'zrealizowany',
}

export interface TableRow {
  id: string
  name: string
  customer: string
  date: string
  status: string
}

export interface TableRowProps {
  data: TableRow[]
  action: React.JSX.Element
}

export interface HeaderDataProps {
  id: string
  name: string
  customer: string
  date: string
  status: string
  action: string
}

export interface TableHeaderProps {
  data: HeaderDataProps
}
