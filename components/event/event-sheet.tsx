"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { useEventSheet } from "@/hooks/use-sheet";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  startTime: z.string().min(2, { message: "Start time is required" }),
  endTime: z.string().min(2, { message: "End time is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  date: z.date({
    required_error: "A date is required",
  }),
});

export function EventSheet() {
  const params = useParams();
  const eventSheet = useEventSheet();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      location: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const today = moment().format("YYYY-MM-DD");
    setBusy(true);
    try {
      await axios.post(`/api/entities/${params.entityId}/event`, {
        ...data,
        startTime: moment(
          today + " " + data.startTime,
          "YYYY-MM-DD h:mm A",
        ).toISOString(),
        endTime: moment(
          today + " " + data.endTime,
          "YYYY-MM-DD h:mm A",
        ).toISOString(),
        entityId: params.entityId,
      });
      eventSheet.onClose();
      toast.success("Event Successfully added");
      router.refresh();
    } catch (error) {
      toast.error("Failed to Saved Event");
    } finally {
      setBusy(false);
    }
  }

  function eventSheetOnChange() {
    if (eventSheet.isOpen) {
      eventSheet.onClose();
    } else {
      eventSheet.onOpen();
    }
  }

  return (
    <Sheet onOpenChange={eventSheetOnChange} open={eventSheet.isOpen}>
      <SheetTrigger asChild>
        <Button>Add Event</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Event</SheetTitle>
          <SheetTitle>add event for your entity</SheetTitle>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sunday Morning Service" {...field} />
                    </FormControl>
                    <FormDescription>Name of event </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="startTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input placeholder="8:00" {...field} />
                    </FormControl>
                    <FormDescription>Start time of event</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="endTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input placeholder="10:00" {...field} />
                    </FormControl>
                    <FormDescription>End time of event</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Bethel Church" {...field} />
                    </FormControl>
                    <FormDescription>Location of event</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Select date for event</FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
