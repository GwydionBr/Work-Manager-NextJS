import { Link } from "@nextui-org/react";
import { Button } from "@/components/ui/button"

export default function ReturnButton({ path }: { path: string }) {
  return (
    <Link href={path}>
      <Button className="bg-accent text-accent-foreground">Back</Button>
    </Link>
  )
}