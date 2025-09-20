import { Footer } from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import { BlogUpdate } from './Components/BlogUpdate';

export function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col justify-start overflow-y-auto bg-gray-500 text-white">
        <main className="flex h-auto flex-1 flex-col gap-4 p-4 text-center">
          <BlogUpdate></BlogUpdate>
          <BlogUpdate></BlogUpdate>
          <BlogUpdate></BlogUpdate>
        </main>
        <Footer />
      </div>
    </div>
  );
}
