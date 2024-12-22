import { ModeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-end p-4">
        <ModeToggle />
      </header>

      <div className="grid flex-1 place-items-center">hello, world</div>
    </div>
  );
}
