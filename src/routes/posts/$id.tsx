import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';

export const Route = createFileRoute('/posts/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}posts/${id}.md`);

      if (!response.ok) {
        throw new Error('Error fetching post');
      }

      return await response.text();
    },
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }

  if (query.isError) {
    return <p>Error loading post</p>;
  }

  return (
    <div className="prose">
      <ReactMarkdown>{query.data ?? ''}</ReactMarkdown>
    </div>
  );
}
