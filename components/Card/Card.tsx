import { CardType } from '@/types/Card.type'
import React from 'react'

const Card = ({ title, description, count }: CardType) => {
  return (
    <section className="flex flex-col border-greenLight border p-6 rounded-lg">
      <h3 className="text-greenLight font-semibold text-lg">{title}</h3>
      <p className="text-gray-200 text-xs my-2">{description}</p>
      <div className="font-semibold text-2xl">{count}</div>
    </section>
  )
}

export default Card
