'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button";
import * as actions from '@/actions';
import AddIcon from '@mui/icons-material/Add';


const FormSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters long",
  }),
  projectDescription: z.string(),
  projectSalary: z.number().min(0, {
    message: "Project salary must be a positive number",
  }),
});

export default function NewProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectSalary: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await actions.createProject(data);
      toast({
        description: "Your project was successfully created!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem creating your project.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return(
    <Dialog>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "secondary" })}>
          <AddIcon/>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  What is the name of your project?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Do you want to add a description?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    className="border-gray-300 dark:border-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  What is your project's salary?
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
      </DialogContent>
</Dialog>
  )
}