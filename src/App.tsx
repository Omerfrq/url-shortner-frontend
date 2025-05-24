import { Layout } from '@/components/ui/layout';
import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/home';
import { RedirectPage } from '@/pages/redirect';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/:shortcode' element={<RedirectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
