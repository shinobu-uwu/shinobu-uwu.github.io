import avatar from '@/assets/pfp.jpg';
import {
  faBluesky,
  faGithub,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  Avatar,
  Button,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Link, useNavigate } from '@tanstack/react-router';

export default function Header() {
  const { colors } = useMantineTheme();
  const navigate = useNavigate();

  return (
    <header
      className="border-b bg-linear-to-tr from-gray-500 to-gray-700 mb-4"
      style={{ borderColor: colors.gray[3] }}
    >
      <nav className="flex flex-row items-center justify-between px-4 py-2">
        <div className="flex flex-row items-center gap-4">
          <Avatar src={avatar} size="lg" />
          <Text size="xl" fw={700}>
            Shinobu
          </Text>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            size="md"
            onClick={() => navigate({ to: '/' })}
            variant="subtle"
          >
            Home
          </Button>
          <Button
            size="md"
            onClick={() => navigate({ to: '/posts' })}
            variant="subtle"
          >
            Posts
          </Button>
        </div>
        <div className="flex flex-row gap-4">
          <ActionIcon
            onClick={() =>
              window.open('https://github.com/shinobu-uwu', '_blank')
            }
            variant="transparent"
          >
            <FontAwesomeIcon size="xl" icon={faGithub} />
          </ActionIcon>
          <ActionIcon
            onClick={() =>
              window.open(
                'https://bsky.app/profile/shinobu-dev.bsky.social',
                '_blank',
              )
            }
            variant="transparent"
          >
            <FontAwesomeIcon size="xl" icon={faBluesky} />
          </ActionIcon>
          <ActionIcon
            onClick={() => window.open('https://x.com/Shinobu_uwu', '_blank')}
            variant="transparent"
          >
            <FontAwesomeIcon size="xl" icon={faXTwitter} />
          </ActionIcon>
        </div>
      </nav>
    </header>
  );
}
