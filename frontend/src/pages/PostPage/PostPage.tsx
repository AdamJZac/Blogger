import { Comment } from '../../Components/Comment/Comment';
import { InteractionBar } from '../../Components/InteractionBar/InteractionBar';

export function PostPage() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto rounded p-4">
      <div className="mb-6 flex h-auto flex-col items-start gap-2">
        <h1 className="text-2xl">Post title</h1>
        <div className="flex gap-4">
          <p className="pl-4">Blog</p>
          <p>Author</p>
        </div>
      </div>
      <div className="h-auto justify-start rounded border-2 border-gray-600 text-left shadow">
        <div className="flex flex-col gap-4">
          <p className="p-2">Post content...</p>
          <div className="flex justify-around">
            <InteractionBar />
          </div>
        </div>
      </div>
      <div className="text-left">
        <h2 className="mb-4 text-xl">Comments</h2>
        <ul className="flex flex-col gap-4">
          <li>
            <Comment />
          </li>
        </ul>
      </div>
    </div>
  );
}
