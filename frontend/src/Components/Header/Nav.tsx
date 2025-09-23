import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <div className="flex h-full justify-end">
      <nav className="flex h-full flex-col justify-center">
        <ol className="">
          <li className="">
            <Link to="" className="hover:underline">
              Profile
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
