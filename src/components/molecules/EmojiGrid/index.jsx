import Emoji from '@/components/atoms/Emoji'

const gaps = {
  xs: 'gap-1',
  sm: 'gap-2 md:gap-3',
}

export default function EmojiGrid({ symbol, rows, columns, size = 'sm' }) {
  return (
    <div className={`grid w-fit ${gaps[size]}`} style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}>
      {Array.from({ length: rows * columns }, (_, index) => (
        <Emoji key={index} symbol={symbol} size={size} />
      ))}
    </div>
  )
}
