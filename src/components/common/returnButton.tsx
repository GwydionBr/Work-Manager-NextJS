import { Link } from "@nextui-org/react";
import { Button } from "@/components/ui/button"

export default function ReturnButton({ path }: { path: string }) {
  return (
    <Link href={path}>
      <Button variant="secondary">Back</Button>
    </Link>
  )
}