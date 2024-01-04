"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import Heading from "./Heading";

import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";

function RegisterModal() {
  const { toggle: loginModalToggle } = useLoginModal();
  const { isOpen: registerModalisOpen, toggle: registerModalToggle } =
    useRegisterModal();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email(),
    name: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters.",
      })
      .max(50, {
        message: "Name must be less than 50 characters.",
      }),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(50, {
        message: "Password must be less than 50 characters.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    axios
      .post("/api/register", values)
      .then(() => {
        registerModalToggle();
        toast({
          variant: "success",
          title: "Verification Email sent to Email",
          description: "Please Verify to activate your accout",
        });
      })
      .catch((err) => {
        // show error toast

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Dialog open={registerModalisOpen} onOpenChange={registerModalToggle}>
      <DialogContent>
        <DialogHeader className="border-b-[1px] pb-4">
          <DialogTitle className="text-center">Register</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Heading
              titleBefore="Welcome to"
              title="Homie"
              subtitle="Create an Account!"
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Register"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <DialogFooter className="w-full">
          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={() => signIn("google")}
              className="w-full border-black border-[1.8px]"
              variant={"outline"}
            >
              Continue with Google
            </Button>
            <div className="text-neutral-500 text-sm flex justify-center flex-row items-center gap-2 text-center mt-4">
              <div>Already have an account?</div>
              <div
                onClick={() => {
                  registerModalToggle();
                  setTimeout(() => loginModalToggle(), 300);
                }}
                className="text-neutral-800 cursor-pointer hover:underline"
              >
                Log in
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
