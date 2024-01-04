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
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import useResetModal from "@/hooks/useResetModa";

function LoginModal() {
  const { isOpen: loginModalisOpen, toggle: loginModalToggle } =
    useLoginModal();
  const { toggle: registerModalToggle } = useRegisterModal();
  const { toggle: resetModalToggle } = useResetModal();
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signIn("credentials", { ...values, redirect: false }).then((callback) => {
      setLoading(false);
      if (callback?.ok) {
        toast({
          variant: "success",
          title: "Logged In Successfully!",
        });
        router.refresh();
        loginModalToggle();
      }
      if (callback?.error) {
        toast({
          variant: "destructive",
          title: callback?.error,
        });
      }
    });
  }

  return (
    <Dialog open={loginModalisOpen} onOpenChange={loginModalToggle}>
      <DialogContent>
        <DialogHeader className="border-b-[1px] pb-4">
          <DialogTitle className="text-center">Sign In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Heading
              titleBefore="Welcome to"
              title="Homie"
              subtitle="Login to your account"
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
            <div className="w-full">
              <Button
                onClick={() => {
                  loginModalToggle();
                  resetModalToggle();
                }}
                variant={"link"}
                type="button"
                className="w-full mx-auto"
              >
                Forgot Password?
              </Button>
            </div>
            <DialogFooter className="mt-6">
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
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
              <div>Don&apos;t an account?</div>
              <div
                onClick={() => {
                  loginModalToggle();
                  setTimeout(() => registerModalToggle(), 300);
                }}
                className="text-neutral-800 cursor-pointer hover:underline"
              >
                Sign up
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
