import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme('light')}>Default</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
    </div>
  );
}
