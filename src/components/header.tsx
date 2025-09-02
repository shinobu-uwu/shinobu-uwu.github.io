import avatar from '@/assets/pfp.jpg';
import {
  faBluesky,
  faGithub,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export default function Header() {
  const openFn = (url: string) => () => window.open(url, '_blank');

  return (
    <AppBar variant="outlined" position="sticky" sx={{ marginBottom: 8 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="flex flex-row items-center gap-2">
          <Avatar src={avatar} />
          <Link to="/">
            <Typography variant="h6">Shinobu</Typography>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <IconButton onClick={openFn('https://x.com/Shinobu_uwu')}>
            <FontAwesomeIcon icon={faXTwitter} />
          </IconButton>
          <IconButton
            onClick={openFn('https://bsky.app/profile/shinobu-dev.bsky.social')}
          >
            <FontAwesomeIcon icon={faBluesky} />
          </IconButton>
          <IconButton onClick={openFn('https://github.com/shinobu-uwu')}>
            <FontAwesomeIcon icon={faGithub} />
          </IconButton>
          <IconButton
            onClick={openFn(
              'https://www.linkedin.com/in/matheus-filipe-dos-santos-reinert-ba70901a3/',
            )}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
