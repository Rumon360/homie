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

import { signIn } from "next-auth/react";
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

import useResetModal from "@/hooks/useResetModa";
import axios from "axios";

function ResetModal() {
  const { isOpen, toggle } = useResetModal();
  const [steps, setSteps] = useState(0);

  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(50, {
        message: "Password must be less than 50 characters.",
      }),
    token: z.string().min(4),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      token: "",
    },
  });

  const email = form.watch("email");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      axios
        .post("/api/reset/verify", { data: values })
        .then(() => {
          toast({
            variant: "success",
            title: "Changed password..",
          });
          setSteps(0);
          toggle();
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Error changing password..",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong..",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader className="border-b-[1px] pb-4">
          <DialogTitle className="text-center">Reset Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Heading
              titleBefore="Reset your"
              title="password"
              subtitle="we will send you a token to your email to reset your password..."
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
            {steps !== 0 && (
              <>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <DialogFooter className="mt-6">
              {steps === 0 ? (
                <Button
                  onClick={() => {
                    form.trigger("email");
                    const check = form.getFieldState("email");
                    if (!check.isDirty || check.invalid) return;
                    setLoading(true);
                    axios
                      .post("/api/reset", { data: email })
                      .then(() => {
                        toast({
                          variant: "success",
                          title: "Password Reset Mail Sent",
                        });
                        setSteps(1);
                      })
                      .catch((err) => {
                        toast({
                          variant: "destructive",
                          title: "Invalid Email!",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                    // onNext();
                  }}
                  disabled={isLoading}
                  type="button"
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Send Reset Mail"
                  )}
                </Button>
              ) : (
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Reset"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ResetModal;
