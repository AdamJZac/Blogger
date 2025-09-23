export function BlogPost() {
  return (
    <section className="flex h-auto flex-col gap-4 rounded bg-gray-600 p-4 text-left shadow-lg">
      <div className="flex gap-4">
        <h2 className="">Post title</h2>
        <p>Date</p>
      </div>
      <div>
        <p className="pl-4">Post body...</p>
      </div>
      <div className="flex gap-2">
        <button className="border-1">+</button>
        <button className="border-1">-</button>
        <button className="border-1">comments</button>
      </div>
    </section>
  );
}
