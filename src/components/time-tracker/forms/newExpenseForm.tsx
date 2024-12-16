"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
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
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import * as actions from "@/actions";
import AddIcon from "@mui/icons-material/Add";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  amount: z.number().min(0, {
    message: "Amount must be a positive number",
  }),
  description: z.string().optional(),
  monthly: z.boolean(),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export default function NewExpenseForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
      monthly: false,
      startDate: new Date(),
      endDate: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await actions.createExpense(data);
      toast({
        description: "Your expense was successfully created!",
      });
      form.reset(); // Reset form after successful submission
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem creating your expense.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className={buttonVariants({ variant: "secondary" })}>
          <AddIcon />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Expense</DialogTitle>
          <DialogDescription>
            Create a new expense by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    What is the title of your expense?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    What is the amount of your expense?
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
            <FormField
              control={form.control}
              name="description"
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
              name="monthly"
              render={({ field }) => (
                <FormItem className="flex gap-4 items-center"> 
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Is this a monthly expense?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    When does this expense start?
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger>
                        <div
                          className={buttonVariants({ variant: "secondary" })}
                        >
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)} // Ensure onSelect updates the field value
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    When does this expense end? (Optional)
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger>
                        <div
                          className={buttonVariants({ variant: "secondary" })}
                        >
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)} // Ensure onSelect updates the field value
                          disabled={(date) =>
                            date > new Date("2030-12-31") ||
                            date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 text-center"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
