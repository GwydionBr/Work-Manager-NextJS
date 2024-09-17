'use client';

import {
  NavbarItem,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import SignInButton from './auth/signInButton';
import SignOutButton from './auth/signOutButton';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <div className="flex flex-col justify-center gap-4">
              <p className="text-center">{session.data.user.name}</p>
              <SignOutButton />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
