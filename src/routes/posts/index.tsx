import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="flex justify-center mt-10">Hello</div>;
}
