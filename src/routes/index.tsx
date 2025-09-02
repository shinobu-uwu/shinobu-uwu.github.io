import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, createFileRoute } from '@tanstack/react-router';

const posts = {
  osdev: [
    {
      id: 'osdev/1-intro',
      title: 'Yet Another Rust OS',
      description:
        'Exploring the world of operating systems development with Rust',
    },
    {
      id: 'osdev/2-setup',
      title: 'Basic setup',
      description: 'How to have a basic setup we can build on',
    },
    {
      id: 'osdev/3-memory',
      title: 'Memory management',
      description: 'Interfacing with hardware safely and efficiently',
    },
  ],
};

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col gap-8 items-center px-4">
      <div className="flex flex-col items-center max-w-2xl">
        <Typography variant="h2" textAlign="center">
          Hi, I'm Matheus 👋
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary">
          I build things, write about operating systems, and love open-source.
        </Typography>
      </div>
      <Typography variant="h6">Operating Systems Development</Typography>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
        {posts.osdev.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostCard({
  post,
}: { post: { id: string; title: string; description: string } }) {
  return (
    <Card
      key={post.id}
      sx={{
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 200,
      }}
      variant="elevation"
    >
      <CardContent>
        <Tooltip title={post.title}>
          <Typography
            gutterBottom
            variant="h6"
            color="text.primary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.title}
          </Typography>
        </Tooltip>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="body2">{post.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to="/posts/$id" params={{ id: post.id }}>
            Read
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
