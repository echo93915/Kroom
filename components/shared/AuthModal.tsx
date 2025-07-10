"use client";

import { useEffect, useState } from "react";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state after a short delay to allow for closing animation
      setTimeout(() => {
        setShowConfirmationMessage(false);
        setError(null);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        setIsSignupMode(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    
    const { error } = await signInWithEmail({ email, password });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please check your credentials or sign up for a new account.");
      } else {
        setError(error.message);
      }
    } else {
      onClose();
    }
    setIsLoading(false);
  };

  const handleSignUpClick = () => {
    setError(null);
    
    // Basic validation before showing confirm password
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Show signup mode with confirm password field
    setIsSignupMode(true);
  };

  const handleSignUpConfirm = async () => {
    setError(null);

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);
    
    const { data, error } = await signUpWithEmail({ email, password });
    
    // Debug logging to see what we're actually getting
    console.log("Signup response:", { data, error });
    console.log("Error message:", error?.message);
    console.log("Data user:", data?.user);
    console.log("Data session:", data?.session);
    console.log("User identities:", data?.user?.identities);

    if (error) {
      console.log("Error case");
      if (error.message.includes("User already registered") || 
          error.message.includes("already registered") ||
          error.message.includes("email already exists")) {
        setError("An account with this email already exists. Please sign in instead.");
      } else {
        setError(error.message);
      }
    } else if (data.user) {
      // Check identities array to determine if this is a new user or existing user
      if (data.user.identities && data.user.identities.length === 0) {
        console.log("Existing user case - empty identities array");
        // Empty identities array means user already exists (email confirmation disabled)
        setError("An account with this email already exists. Please sign in instead.");
      } else if (data.user.identities && data.user.identities.length > 0) {
        console.log("New user case - identities array has content");
        // Identities array has content, this is a new user
        if (data.session) {
          console.log("New user immediately signed in (email confirmation disabled)");
          // Email confirmation is disabled, user is immediately signed in
          onClose();
        } else {
          console.log("New user needs email confirmation (email confirmation enabled)");
          // Email confirmation is enabled, show confirmation message
          setShowConfirmationMessage(true);
        }
      } else {
        console.log("Unexpected user response");
        setError("Something went wrong during signup. Please try again.");
      }
    } else {
      console.log("No user data returned");
      setError("Something went wrong during signup. Please try again.");
    }
    setIsLoading(false);
  };

  const handleBackToLogin = () => {
    setIsSignupMode(false);
    setConfirmPassword("");
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {showConfirmationMessage ? (
          <>
            <DialogHeader>
              <DialogTitle>Check your email</DialogTitle>
              <DialogDescription>
                We've sent a confirmation link to <strong>{email}</strong>.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4">
              <p>
                Please check your inbox to complete your registration.
              </p>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {isSignupMode ? "Confirm your password" : "Log in or sign up"}
              </DialogTitle>
              <DialogDescription>
                {isSignupMode 
                  ? "Please confirm your password to complete signup."
                  : "Enter your email and password to continue."
                }
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
                  disabled={isLoading || isSignupMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isSignupMode}
                />
              </div>
              
              {isSignupMode && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-sm">Passwords do not match</p>
                  )}
                </div>
              )}
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              {!isSignupMode ? (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSignIn} 
                    className="flex-1"
                    disabled={isLoading || !email || !password}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                  <Button 
                    onClick={handleSignUpClick} 
                    variant="outline"
                    className="flex-1"
                    disabled={isLoading || !email || !password}
                  >
                    Sign Up
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleBackToLogin} 
                    variant="outline"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleSignUpConfirm} 
                    className="flex-1"
                    disabled={isLoading || !confirmPassword || password !== confirmPassword}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              )}

              {!isSignupMode && (
                <>
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
                      disabled={isLoading}
                    />
                    <SocialButton
                      icon={GoogleIcon}
                      text="Continue with Google"
                      onClick={signInWithGoogle}
                      disabled={isLoading}
                    />
                    <SocialButton
                      icon={FaApple}
                      text="Continue with Apple"
                      color="#000000"
                      onClick={signInWithApple}
                      disabled={isLoading}
                    />
                    <SocialButton
                      icon={Mail}
                      text="Continue with Email"
                      color="#808080"
                      disabled={isLoading}
                    />
                    <SocialButton
                      icon={FaFacebook}
                      text="Continue with Facebook"
                      color="#1877F2"
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const SocialButton = ({
  icon: Icon,
  text,
  color,
  onClick,
  disabled = false,
}: {
  icon: any;
  text: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-start"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="mr-4 h-5 w-5" style={{ color }} />
      {text}
    </Button>
  );
}; 