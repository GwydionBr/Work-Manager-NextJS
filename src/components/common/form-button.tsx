'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/button';

interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="secondary" isLoading={pending}>
      {children}
    </Button>
  );
}
