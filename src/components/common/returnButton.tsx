import { Link } from "@nextui-org/react";
import { Button } from "@/components/ui/button"

interface ReturnButtonProps {
  path: string,
  className?: string
}

export default function ReturnButton({ path, className }: ReturnButtonProps) {
  return (
    <Link href={path} className={className}>
      <Button variant="secondary">Back</Button>
    </Link>
  )
}