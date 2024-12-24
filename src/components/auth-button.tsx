'use client';

import {
  IconBadge,
  IconBrandGithub,
  IconLoader3,
  IconLogout,
} from '@tabler/icons-react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function AuthButton({ minimal = false }: { minimal?: boolean }) {
  const { data, status } = useSession();

  if (status === 'loading') {
    return (
      <IconLoader3
        className="animate-spin"
        aria-label="Loading authentication status..."
      />
    );
  }

  if (status === 'authenticated') {
    const user = data.user;
    const signOutClick = () =>
      signOut({
        callbackUrl: '/',
      });

    if (minimal) {
      return (
        <Button onClick={signOutClick} variant="outline">
          <IconBrandGithub />
          Log Out
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconBadge />
              Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOutClick}>
            <IconLogout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() =>
        signIn('github', {
          callbackUrl: '/tasks',
        })
      }
      variant="outline"
    >
      <IconBrandGithub />
      Sign In
    </Button>
  );
}
