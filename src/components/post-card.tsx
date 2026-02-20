import { Link } from '@tanstack/react-router'

type PostCardProps = {
  slug: string
  topic: string
  title: string
  summary: string
  date: string
  tag: string
  actionLabel?: string
  variant?: 'card' | 'plain'
  className?: string
}

export default function PostCard({
  slug,
  topic,
  title,
  summary,
  date,
  tag,
  actionLabel = 'Read article',
  variant = 'card',
  className = '',
}: PostCardProps) {
  const base =
    variant === 'card'
      ? 'group flex h-full flex-col justify-between rounded-3xl border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/30 p-6 transition hover:-translate-y-1 hover:border-[color:var(--dracula-purple)]'
      : 'space-y-4'

  return (
    <article className={`${base} ${className}`.trim()}>
      <div>
        <span className="inline-flex items-center rounded-full border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-bg)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--dracula-comment)]">
          {tag}
        </span>
        <p className="mt-4 text-sm text-[color:var(--dracula-comment)]">
          {date}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[color:var(--dracula-foreground)]">
          {title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[color:var(--dracula-comment)]">
          {summary}
        </p>
      </div>
      {actionLabel ? (
        <Link
          to="/blog/$topic/$slug"
          params={{ topic, slug }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--dracula-purple)] transition group-hover:text-[color:var(--dracula-pink)]"
        >
          {actionLabel}
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  )
}
