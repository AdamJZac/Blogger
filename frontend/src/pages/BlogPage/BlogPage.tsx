import { BlogPost } from './components/BlogPost';

type BlogPageProps = {
  blog: string;
};

export function BlogPage({ blog }: BlogPageProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-1 flex-col items-center justify-start gap-4">
        <section className="mb-6 flex h-auto flex-col justify-start gap-4">
          <div className="flex">
            <h1 className="flex-1 text-left text-2xl">Blog title</h1>
            <div className="flex flex-1 justify-end gap-2">
              <button className="border-1">Follow</button>
              <button className="border-1">Info</button>
            </div>
          </div>
          <div className="flex gap-4">
            <h2>Author</h2>
            <p>Created On</p>
            <p>Description</p>
          </div>
        </section>
        <BlogPost />
        <BlogPost />
        <BlogPost />
      </div>
    </div>
  );
}
