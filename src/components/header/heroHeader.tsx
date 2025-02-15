interface HeroHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function HeroHeader({ title, subtitle }: HeroHeaderProps) {
  return (
    <header className="w-full p-8 bg-background text-foreground">
      <div className="container mx-auto flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl">{title}</h1>
        <p className="text-sm ml-4">{subtitle}</p>
      </div>
    </header>
  )
}
