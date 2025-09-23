import { BlogPost } from './components/BlogPost';

type BlogPageProps = {
  blog: string;
};

export function BlogPage({ blog }: BlogPageProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-1 flex-col items-center justify-start gap-4">
        <section className="mb-6 flex h-auto flex-row items-center justify-start gap-8">
          <h1 className="flex-1 text-left text-2xl">Blog title</h1>
          <h2>Author</h2>
          <p>Created On</p>
          <p>Description</p>
        </section>
        <BlogPost />
        <BlogPost />
        <BlogPost />
      </div>
    </div>
  );
}
