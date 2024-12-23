'use client';

import {
  IconBadge,
  IconBell,
  IconBrandGithub,
  IconChevronUp,
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

export default function AuthButton({ minimal = true }: { minimal?: boolean }) {
  const { data, status } = useSession();

  if (status === 'loading') {
    return <IconLoader3 aria-label="Loading authentication status..." />;
  }

  if (status === 'authenticated') {
    const user = data.user;
    const signOutClick = () =>
      signOut({
        callbackUrl: '/',
      });

    if (minimal) {
      return (
        <Button onClick={signOutClick} variant="ghost">
          <IconBrandGithub />
          Sign Out
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={user.image ?? ''} alt={user.name ?? 'User'} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <IconChevronUp className="ml-auto size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 rounded-lg"
          side="right"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.image ?? ''} alt={user.name ?? 'User'} />
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
              <IconBadge className="mr-2" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconBell className="mr-2" />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOutClick}>
            <IconLogout className="mr-2" />
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
          callbackUrl: '/profile',
        })
      }
      variant="ghost"
    >
      <IconBrandGithub />
      Sign In
    </Button>
  );
}
