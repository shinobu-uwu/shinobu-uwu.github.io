import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import { posts } from '@/data/posts'

export const Route = createFileRoute('/blog/$topic/$slug')({
  component: BlogPost,
  loader: ({ params }) => {
    const post = posts.find(
      (item) => item.slug === params.slug && item.topic === params.topic
    )
    if (!post) {
      throw notFound()
    }
    return post
  },
})

function BlogPost() {
  const post = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(189,147,249,0.18),_transparent_50%),_linear-gradient(180deg,_#282a36_0%,_#2f3140_60%,_#282a36_100%)] text-[color:var(--dracula-foreground)]">
      <section className="mx-auto w-full max-w-4xl px-6 pb-20 pt-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--dracula-purple)] transition hover:text-[color:var(--dracula-pink)]"
        >
          <span aria-hidden="true">←</span>
          Back to blog
        </Link>

        <div className="mt-8 rounded-3xl border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/30 p-8">
          <span className="inline-flex items-center rounded-full border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-bg)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--dracula-comment)]">
            {post.tag}
          </span>
          <p className="mt-4 text-sm text-[color:var(--dracula-comment)]">
            {post.formattedDate}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
        </div>

        <article className="prose prose-invert mt-10 max-w-none text-[color:var(--dracula-comment)] prose-headings:tracking-tight prose-a:text-[color:var(--dracula-cyan)] prose-a:no-underline hover:prose-a:text-[color:var(--dracula-purple)] prose-strong:text-[color:var(--dracula-foreground)] prose-code:text-[color:var(--dracula-foreground)] prose-code:bg-[color:var(--dracula-current-line)]/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </section>
    </div>
  )
}
