import { useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </NextThemesProvider>
  );
}
