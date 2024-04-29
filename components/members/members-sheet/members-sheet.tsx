"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSheet } from "@/hooks/use-sheet";
import { useStoreMember } from "@/hooks/use-member";

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First  name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  address: z.string().min(2, { message: "address is required" }),
  contact: z.string().min(2, { message: "Contact number required" }),
});
export function MemberSheet() {
  const params = useParams();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const sheet = useSheet();
  const member = useStoreMember();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (member.member.id) {
      console.log("here");
      form.setValue("firstName", member.member.firstName);
      form.setValue("lastName", member.member.lastName);
      form.setValue("address", member.member.address);
      form.setValue("contact", member.member.contact);
    }
  }, [member.member]);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setBusy(true);
      if (member.member.id) {
        await axios.patch(`/api/entities/${params.entityId}/members`, {
          id: member.member.id,
          ...data,
        });
      } else {
        await axios.post(`/api/entities/${params.entityId}/members`, {
          ...data,
          entityId: params.entityId,
        });
      }
      sheet.onClose();
      toast.success(
        `member successfully ${member.member.id ? "edited" : "added"}`,
      );
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${member.member.id ? "update" : "save"} member`);
    } finally {
      setBusy(false);
    }
  }
  function sheetOnChange() {
    if (sheet.isOpen) {
      sheet.onClose();
      member.setMember({
        id: "",
        firstName: "",
        lastName: "",
        address: "",
        contact: "",
      });
      form.reset();
    } else {
      sheet.onOpen();
    }
  }
  return (
    <Sheet onOpenChange={sheetOnChange} open={sheet.isOpen}>
      <SheetTrigger asChild>
        <Button>Add Member</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{member.member.id ? "Update" : "Add"} Member</SheetTitle>
          <SheetDescription>add a new member to your entity</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jarad..." {...field} />
                    </FormControl>
                    <FormDescription>Members first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*    last name*/}
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jarad..." {...field} />
                    </FormControl>
                    <FormDescription>Members last name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*    address*/}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="23 Towhill street"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Members address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/*    contact*/}
              <FormField
                name="contact"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="0826751234..." {...field} />
                    </FormControl>
                    <FormDescription>Members contact number</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={busy}>
                  {member.member.id ? "Update" : "Save"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
