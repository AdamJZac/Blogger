import { Link } from 'react-router-dom';
import { BlogUpdate } from './Components/BlogUpdate';

export function HomePage() {
  return (
    <>
      <Link to="/blog">TEST</Link>
      <BlogUpdate></BlogUpdate>
      <BlogUpdate></BlogUpdate>
      <BlogUpdate></BlogUpdate>
      <BlogUpdate></BlogUpdate>
    </>
  );
}
