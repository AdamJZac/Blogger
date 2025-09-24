import { Link } from 'react-router-dom';
import { InteractionBar } from '../../../Components/InteractionBar/InteractionBar';

export function BlogUpdate() {
  return (
    <section className="box-border flex h-auto flex-col gap-4 rounded-lg border-2 border-gray-600 bg-gray-600 text-left shadow-lg has-group-hover:border-white">
      <div className="flex">
        <div className="flex w-auto max-w-fit flex-col">
          <InteractionBar />
        </div>

        <Link className="group h-full w-full flex-1 p-4" to="/post">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <h2 className="">Blog</h2>
              <p>Post title</p>
              <p>Date</p>
            </div>
            <div>
              <p className="pl-4">Post body...</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
