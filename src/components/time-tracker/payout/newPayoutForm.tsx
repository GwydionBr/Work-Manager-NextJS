"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
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
import { DatePicker } from "@nextui-org/date-picker";
import { CalendarDate } from "@internationalized/date";
import * as actions from "@/actions";
import AddIcon from "@mui/icons-material/Add";

const FormSchema = z.object({
  amount: z.number().min(0, {
    message: "Amount must be a positive number",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export default function NewPayoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
      date: new Date().toISOString().split("T")[0], // Initialize with today's date
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const newPayout = {
        amount: data.amount,
        date: new Date(data.date),
      };
      await actions.createPayout(newPayout);
      toast({
        description: "Your payout was successfully created!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem creating your payout.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "secondary" })}>
          <AddIcon />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Payout</DialogTitle>
          <DialogDescription>
            Create a new payout by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Amount
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Date
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      value={
                        new CalendarDate(
                          new Date(field.value).getFullYear(),
                          new Date(field.value).getMonth() + 1,
                          new Date(field.value).getDate()
                        )
                      }
                      onChange={(date) => field.onChange(date.toString())}
                      name="date"
                      labelPlacement="outside"
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
              {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
