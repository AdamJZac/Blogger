import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { MainLayout } from './layouts/MainLayout';
import { BlogPage } from './pages/BlogPage/BlogPage';
import { HomePage } from './pages/HomePage/Homepage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage blog="Test1" />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
