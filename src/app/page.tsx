import { getServerSession } from 'next-auth';

import AuthButton from '@/components/auth-button';
import { ModeToggle } from '@/components/theme-toggle';
import options from '@/config/auth';

export default async function Home() {
  const session = await getServerSession(options);

  console.log(session);

  return (
    <div className="flex h-screen w-screen flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-end gap-2 p-4">
        <ModeToggle />

        <AuthButton />
      </header>
    </div>
  );
}
