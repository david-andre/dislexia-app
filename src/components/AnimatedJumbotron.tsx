import './animatedJumbotron.css'

interface AnimatedJumbotronProps {
  features: {
    content: [string, string]
    style: string
    text: string
  }
}

export default function AnimatedJumbotron({ features }: AnimatedJumbotronProps) {
  const [first, second] = features.content
  return (
    <div className={features.style}>
      <h1 className={`font-luckiest-guy ${features.text} text-white aj-h1`}>
        <span className="inline-block aj-span-1">{first}</span>
        {second ? (
          <span className="ml-7 inline-block content-end aj-span-2">{second}</span>
        ) : null}
      </h1>
    </div>
  )
}
