import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Aside } from '../Components/Aside/Aside';
import { Footer } from '../Components/Footer/Footer';
import { Header } from '../Components/Header/Header';

export function MainLayout() {
  const [aside, setAside] = useState<boolean>(false);
  function toggleAside() {
    setAside(() => !aside);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex min-h-fit gap-4 bg-gray-800 p-2 px-4 text-white">
        <Header toggleAside={toggleAside} />
      </header>

      <div className="flex flex-row-reverse overflow-y-auto bg-gray-500 text-white">
        <div className="flex flex-1 flex-col justify-start">
          {aside && (
            <button
              className="fixed h-full w-full bg-gray-900 opacity-35"
              onClick={toggleAside}
            ></button>
          )}
          <main className="flex h-auto flex-1 flex-col gap-4 p-4 text-center">
            <Outlet />
          </main>
          <footer className="min-h-fit p-2">
            <Footer />
          </footer>
        </div>
        <aside
          style={{ transform: aside ? 'translateX(0)' : 'translateX(-100%)' }}
          className="fixed left-0 z-50 flex h-full w-26 flex-col overflow-hidden bg-gray-800 text-white opacity-90 transition-all duration-300 ease-in-out sm:w-full"
        >
          <Aside />
        </aside>
      </div>
    </div>
  );
}
