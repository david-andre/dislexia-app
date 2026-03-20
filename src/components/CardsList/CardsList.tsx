import Card from './Card'

import './cardsList.css'

interface Option {
  text: string
  val?: boolean
}

interface CardsListProps {
  options: Option[][]
  handleClick: (content: string) => void
}

export default function CardsList({ options, handleClick }: CardsListProps) {
  const current = options[0]
  if (!current) return null

  return (
    <div className="cards-list">
      <Card content={current[0]?.text ?? ''} handleClick={handleClick} />
      <Card content={current[1]?.text ?? ''} handleClick={handleClick} />
      <Card content={current[2]?.text ?? ''} handleClick={handleClick} />
    </div>
  )
}
