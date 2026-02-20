import { Link } from '@tanstack/react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBluesky,
  faGithub,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import headerImage from '@/assets/shinobu.jpg'

const socials = [
  {
    label: 'X',
    href: 'https://x.com/Shinobu_uwu',
    icon: faXTwitter,
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/shinobu-dev.bsky.social',
    icon: faBluesky,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/shinobu-uwu',
    icon: faGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matheus-filipe-dos-santos-reinert-ba70901a3/',
    icon: faLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:matheus.reinert@protonmail.com',
    icon: faEnvelope,
  },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 overflow-hidden border-b border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-bg)]/90 backdrop-blur">
      <img
        src={headerImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10 blur-sm"
      />
      <div className="absolute inset-0 bg-[color:var(--dracula-bg)]/70" />
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <Link to="/" className="flex items-center gap-4 no-underline">
          <img
            src={headerImage}
            alt="Shinobu avatar"
            className="h-14 w-14 rounded-full border-2 border-[color:var(--dracula-purple)]/70"
          />
          <span className="text-[28px] font-semibold tracking-wide text-[color:var(--dracula-foreground)]">
            Shinobu
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[color:var(--dracula-current-line)] bg-[color:var(--dracula-current-line)]/55 text-[color:var(--dracula-foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--dracula-purple)] hover:text-[color:var(--dracula-purple)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--dracula-purple)]"
            >
              <FontAwesomeIcon icon={icon} className="text-[22px]" />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
