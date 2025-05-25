import { Layout } from '@/components/ui/layout';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
