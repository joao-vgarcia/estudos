import Emoji from '@/components/atoms/Emoji'
import Text from '@/components/atoms/Text'
import EmojiGrid from '@/components/molecules/EmojiGrid'

export default function QuestionMedia({ image, word, imageGrid, passage }) {
  if (!image && !word && !imageGrid && !passage) return null

  return (
    <div className="flex justify-center">
      <div className="flex min-w-40 animate-pop flex-wrap items-center justify-center gap-6 rounded-[2rem] border-4 border-white bg-white/15 p-6 sm:p-8">
        {image && <Emoji symbol={image} size="lg" />}
        {word && <Text as="span" variant="highlight">{word}</Text>}
        {imageGrid && <EmojiGrid {...imageGrid} />}
        {passage && <Text>{passage}</Text>}
      </div>
    </div>
  )
}
