const BASE_URL = 'https://fonts.gstatic.com/s/e/notoemoji/latest'

function toCodepoints(emoji) {
  return [...emoji]
    .map((character) => character.codePointAt(0).toString(16))
    .filter((codepoint) => codepoint !== 'fe0f')
    .join('_')
}

export default function AnimatedEmoji({ emoji }) {
  const codepoints = toCodepoints(emoji)
  return (
    <picture>
      <source srcSet={`${BASE_URL}/${codepoints}/512.webp`} type="image/webp" />
      <img src={`${BASE_URL}/${codepoints}/512.gif`} alt={emoji} width="512" height="512" className="size-20 sm:size-28" />
    </picture>
  )
}
