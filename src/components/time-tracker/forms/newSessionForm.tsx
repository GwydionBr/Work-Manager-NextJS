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
import * as actions from "@/actions/work-manager/createSession";
import { CalendarDate } from "@internationalized/date";
import AddIcon from "@mui/icons-material/Add";

const createSessionSchema = z.object({
  loggedDate: z.string().min(10),
  loggedHours: z.number().int().min(0),
  loggedMinutes: z.number().int().min(0).max(59),
});

interface NewSessionFormProps {
  projectId: number;
}

export default function NewSessionForm({ projectId }: NewSessionFormProps) {
  const today = new Date();
  const todayValue = new CalendarDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createSessionSchema>>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      loggedDate: todayValue.toString(),
      loggedHours: 0,
      loggedMinutes: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof createSessionSchema>) {
    setIsLoading(true);
    try {
      const newSession = {
        projectId: projectId,
        loggedDate: new Date(data.loggedDate),
        loggedHours: data.loggedHours,
        loggedMinutes: data.loggedMinutes,
      };

      const status = await actions.createSession(newSession);

      if (status) {
        toast({
          description: "Your session was successfully created!",
        });
        form.reset();
        setIsDialogOpen(false); // Close the dialog
      } else {
        toast({
          title: "Error",
          description: "Failed to create session.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem creating your session.",
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
          New Session
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
          <DialogDescription>
            Create a new session by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="loggedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Date of Work
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
                      name="loggedDate"
                      labelPlacement="outside"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loggedHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Hours
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
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
              name="loggedMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Minutes
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
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
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Session"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
