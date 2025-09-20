import { Logo } from './Logo';
import { Nav } from './Nav';

export function Header() {
  return (
    <header className="flex min-h-fit bg-gray-800 p-2 pe-4 text-white">
      <Logo></Logo>
      <Nav></Nav>
    </header>
  );
}
