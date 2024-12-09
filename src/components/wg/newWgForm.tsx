"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

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
import * as actions from "@/actions"

const FormSchema = z.object({
  wgName: z.string().min(2, {
    message: "Der Name muss mindestens 2 Zeichen lang sein",
  }),
  wgDescription: z.string(),
})



export default function NewWgForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wgName: "",
      wgDescription: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const response = await actions.createWG(data)
      if (response.failure) {
        console.log("Error creating WG")
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Erstellen deiner WG.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Erstellen deiner WG.",
      })
    } finally {
      setIsLoading(false)
    }
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
          <FormField
            control={form.control}
            name="wgDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Willst du noch eine Beschreibung hinzufügen?</FormLabel>
                <FormControl>
                  <Input placeholder="Beschreibung" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Lädt..." : "Erstellen"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
