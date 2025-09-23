import { Outlet } from 'react-router-dom';
import { Footer } from '../Components/Footer/Footer';
import { Logo } from '../Components/Header/Logo';

export function AuthLayout() {
  return (
    <div className="flex flex-col">
      <header className="flex min-h-fit bg-gray-800 p-2 text-white">
        <Logo />
      </header>

      <div className="flex flex-1 flex-col justify-start overflow-y-auto bg-gray-500 text-white">
        <main className="flex h-auto flex-1 flex-col gap-4 p-4 text-center">
          <Outlet />
        </main>

        <footer className="min-h-fit p-2">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
