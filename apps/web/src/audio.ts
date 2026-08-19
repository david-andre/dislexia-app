/**
 * Web audio registry. Shared level data carries platform-neutral `audioKey`s
 * (the word, e.g. 'camiseta'); each client maps keys to real playable URLs.
 * Here every mp3 under assets/audio is bundled and keyed by filename.
 */
const audioFiles = import.meta.glob('./assets/audio/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const byKey: Record<string, string> = {}
for (const [path, url] of Object.entries(audioFiles)) {
  const key = path.split('/').pop()!.replace(/\.mp3$/, '')
  byKey[key] = url
}

export function getAudioUrl(key: string | undefined): string | undefined {
  return key ? byKey[key] : undefined
}
