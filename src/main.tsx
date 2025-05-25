import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ReactQueryProvider } from './providers/react-query-provider.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import { DeviceIdInitalizer } from './components/ui/deviceId.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <DeviceIdInitalizer />
      <Toaster />
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </ThemeProvider>
  </BrowserRouter>
);
