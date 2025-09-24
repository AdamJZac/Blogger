import { InteractionBar } from '../InteractionBar/InteractionBar';

export function Comment() {
  return (
    <section className="flex rounded bg-gray-600">
      <div className="flex w-auto flex-col">
        <InteractionBar />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <p>Author</p>
        <p>Comment content...</p>
      </div>
    </section>
  );
}
