import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import api from "@/utility/api";

export default function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("demo.admin@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Current keys in sessionStorage:", Object.keys(sessionStorage));

    api
      .login(email, password)
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("isAuthenticated", true);
        navigate("/admin/dashboard");
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Credentials match, logging in.</span>
            </div>
          ),
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: Failed to login, try again.</span>
            </div>
          ),
        });
      });
    console.log("Before removing: ", sessionStorage.getItem("isAuthenticated"));
    sessionStorage.removeItem("isAuthenticated");
    console.log("After removing: ", sessionStorage.getItem("isAuthenticated"));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await api
      .sendResetPasswordMail(resetEmail)
      .then(() => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Rest Mail send SUccesfully</span>
            </div>
          ),
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: Failed to send reset mail, try again.</span>
            </div>
          ),
        });
      });
  };

  return (
    <>
      {" "}
      <Toaster />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md bg-white">
          {!showForgotPassword ? (
            <>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Rest Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Reset Link
                  </Button>
                </form>
              </CardContent>
            </>
          )}
          <CardFooter className="flex justify-center">
            {!showForgotPassword ? (
              <Button
                variant="link"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Button>
            ) : (
              <Button
                variant="link"
                onClick={() => setShowForgotPassword(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
