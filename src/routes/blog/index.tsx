import { createFileRoute } from '@tanstack/react-router'
import PostCard from '@/components/post-card'
import { posts } from '@/data/posts'

export const Route = createFileRoute('/blog/')({ component: BlogIndex })

function BlogIndex() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--dracula-comment)]">
          Blog
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} date={post.formattedDate} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 rounded-3xl border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/20 px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--dracula-comment)]">
            No posts yet
          </p>
          <p className="text-base text-[color:var(--dracula-comment)]">
            New writing will be published here soon.
          </p>
        </div>
      )}
    </section>
  )
}
