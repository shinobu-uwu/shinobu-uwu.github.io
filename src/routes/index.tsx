import { Link, createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PostCard from '@/components/post-card'
import { posts } from '@/data/posts'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const latestPosts = posts.slice(0, 3)
  const [activePost, setActivePost] = useState(0)

  useEffect(() => {
    if (latestPosts.length === 0) return
    const id = window.setInterval(() => {
      setActivePost((prev) => (prev + 1) % latestPosts.length)
    }, 15000)
    return () => window.clearInterval(id)
  }, [latestPosts.length])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(189,147,249,0.18),_transparent_50%),_linear-gradient(180deg,_#282a36_0%,_#2f3140_60%,_#282a36_100%)] text-[color:var(--dracula-foreground)]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-[color:var(--dracula-pink)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[color:var(--dracula-cyan)]/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/40 px-4 py-2 text-sm text-[color:var(--dracula-comment)]">
              Matheus Filipe dos Santos Reinert
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[color:var(--dracula-foreground)] sm:text-5xl">
              Fullstack Software Engineer 
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[color:var(--dracula-comment)]">
              Fullstack software engineer with experience building full-stack applications using React, React Native, and Go.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[color:var(--dracula-comment)]">
              Strong Linux background, with hands-on experience in systems
              programming with Rust and a growing interest in performance,
              system design, and developer tooling.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--dracula-foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--dracula-purple)] hover:text-[color:var(--dracula-purple)]"
              >
                Read the blog
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--dracula-comment)]">
                Latest writing
              </p>
              {latestPosts.length > 0 ? (
                <div className="flex items-center gap-2">
                  {latestPosts.map((post, index) => (
                    <button
                      key={post.title}
                      type="button"
                      aria-label={`Show ${post.title}`}
                      onClick={() => setActivePost(index)}
                      className={`h-2 w-8 rounded-full transition ${
                        index === activePost
                          ? 'bg-[color:var(--dracula-purple)]'
                          : 'bg-[color:var(--dracula-current-line)]'
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative h-[320px] overflow-hidden rounded-3xl border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/30 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              {latestPosts.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={latestPosts[activePost].slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <PostCard
                      {...latestPosts[activePost]}
                      date={latestPosts[activePost].formattedDate}
                      variant="plain"
                      className="h-full"
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--dracula-comment)]">
                    No posts yet
                  </p>
                  <p className="text-base text-[color:var(--dracula-comment)]">
                    New writing will appear here soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
