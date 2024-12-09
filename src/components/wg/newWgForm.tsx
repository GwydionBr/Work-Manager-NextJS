"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as actions from "@/actions";


const FormSchema = z.object({
  wgName: z.string().min(2, {
    message: "Der Name muss mindestens 2 Zeichen lang sein",
  }),
  wgDescription: z.string(),
});


export default function NewWgForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wgName: "",
      wgDescription: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await actions.createWG(data);
      toast({
        description: "Deine WG wurde erfolgreich erstellt!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Erstellen deiner WG.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
        Neue WG erstellen
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="wgName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Wie soll deine WG heißen?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="WG Name"
                    {...field}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
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
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Willst du noch eine Beschreibung hinzufügen?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Beschreibung"
                    {...field}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-center"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Erstellen"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
