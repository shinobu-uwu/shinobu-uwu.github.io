type PostFrontmatter = {
  title: string
  summary: string
  date: string
  tag: string
}

export type Post = PostFrontmatter & {
  slug: string
  topic: string
  content: string
  formattedDate: string
}

const rawPosts = import.meta.glob<string>(
  '../content/posts/*/*/index.md',
  {
    eager: true,
    query: '?raw',
    import: 'default',
  }
)

const pathSegments = (path: string) =>
  path.split('/').filter((segment) => segment.length > 0)

const extractTopicAndSlug = (path: string) => {
  const segments = pathSegments(path)
  const topicIndex = segments.lastIndexOf('posts') + 1
  const topic = segments[topicIndex] ?? 'posts'
  const slug = segments[topicIndex + 1] ?? 'post'
  return { topic, slug }
}

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
})

function formatDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }
  return formatter.format(parsed)
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { frontmatter: {}, content: raw }
  }

  const frontmatter: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    if (key) {
      frontmatter[key] = value
    }
  }

  return { frontmatter, content: match[2].trim() }
}

export const posts: Post[] = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const { topic, slug } = extractTopicAndSlug(path)
    const { frontmatter, content } = parseFrontmatter(raw)

    return {
      slug,
      topic,
      title: frontmatter.title ?? slug,
      summary: frontmatter.summary ?? '',
      date: frontmatter.date ?? '',
      tag: frontmatter.tag ?? 'Post',
      formattedDate: formatDate(frontmatter.date ?? ''),
      content,
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
