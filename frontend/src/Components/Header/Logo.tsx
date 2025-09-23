import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <div className="max-w-fit">
      <Link to="/home">
        <h1 className="text-2xl hover:underline">Blogger</h1>
      </Link>
    </div>
  );
}
