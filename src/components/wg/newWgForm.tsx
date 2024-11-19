"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  wgName: z.string().min(2, {
    message: "Der Name muss mindestens 2 Zeichen lang sein",
  }),
})



export default function NewWgForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wgName: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    }),
    console.log(data)
  }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col gap-8 w-auto pt-10">
          <FormField
            control={form.control}
            name="wgName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wie soll deine WG heißen?</FormLabel>
                <FormControl>
                  <Input placeholder="WG Name" {...field} />
                </FormControl>
                <FormDescription>
                    Keine Sorge, du kannst den Namen später noch ändern.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Erstellen</Button>
        </form>
      </Form>
    </div>
  )
}
