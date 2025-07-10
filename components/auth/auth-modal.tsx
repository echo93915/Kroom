"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithGoogle, signUp, signInWithPassword } from "@/services/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "https://rqhjrfimfpdkglovopyk.supabase.co/functions/v1/check-user-exists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const { exists } = await response.json();

      if (exists) {
        setError("User already exists. Please log in.");
        setIsSubmitting(false);
        return;
      }

      const result = await signUp(values);
      if (result.error) {
        setError(result.error.message);
      } else {
        setShowConfirmation(true);
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError("");

    const result = await signInWithPassword(values);
    if (result.error) {
      setError(result.error.message);
    } else {
      setIsOpen(false);
    }
    setIsSubmitting(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setError("");
      setShowConfirmation(false);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        {showConfirmation ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl font-semibold">Check your email</h3>
            <p className="mt-2 text-sm text-gray-500">
              We've sent a confirmation link to your email address.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Log in or sign up</DialogTitle>
              <DialogDescription>
                Welcome to K-RooM, please enter your details
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
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
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={form.handleSubmit(handleSignIn)}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Loading..." : "Log In"}
                    </Button>
                    <Button
                      onClick={form.handleSubmit(handleSignUp)}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Loading..." : "Sign Up"}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={signInWithGoogle}
              >
                Continue with Google
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
