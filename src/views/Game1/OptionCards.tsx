import CardsList from '@/components/CardsList/CardsList'

interface Option {
  text: string
  val?: boolean
}

interface OptionCardsProps {
  options: Option[][]
  onSelect: (content: string) => void
}

export default function OptionCards({ options, onSelect }: OptionCardsProps) {
  return (
    <CardsList
      options={options}
      handleClick={onSelect}
    />
  )
}
