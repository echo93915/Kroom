"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaApple, FaFacebook } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { Mail } from "lucide-react";
import GoogleIcon from "./GoogleIcon";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithApple,
} from "@/services/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setError(null);
    const { data, error } = await signInWithEmail({ email, password });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        // If sign-in fails, try to sign up the user
        const { error: signUpError } = await signUpWithEmail({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          // You might want to show a message that a confirmation email has been sent
          onClose();
        }
      } else {
        setError(error.message);
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in or sign up</DialogTitle>
          <DialogDescription>
            Enter your email and password to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleContinue} className="w-full">
            Continue
          </Button>

          <div className="relative my-4">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-4 text-xs text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <SocialButton
              icon={SiNaver}
              text="Continue with Naver"
              color="#03C75A"
            />
            <SocialButton
              icon={GoogleIcon}
              text="Continue with Google"
              onClick={signInWithGoogle}
            />
            <SocialButton
              icon={FaApple}
              text="Continue with Apple"
              color="#000000"
              onClick={signInWithApple}
            />
            <SocialButton
              icon={Mail}
              text="Continue with Email"
              color="#808080"
            />
            <SocialButton
              icon={FaFacebook}
              text="Continue with Facebook"
              color="#1877F2"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const SocialButton = ({
  icon: Icon,
  text,
  color,
  onClick,
}: {
  icon: any;
  text: string;
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-start"
      onClick={onClick}
    >
      <Icon className="mr-4 h-5 w-5" style={{ color }} />
      {text}
    </Button>
  );
}; 