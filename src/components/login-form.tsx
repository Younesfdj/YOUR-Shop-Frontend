import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Package2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "../store/useUser";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
  const { toast } = useToast();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          UserEmail: values.email,
          UserPassword: values.password,
        }
      );

      setUser({
        UserEmail: response.data.data.UserEmail,
        UserName: response.data.data.UserName,
      });
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.data.data.UserName}!`,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
    } catch (error: any) { // eslint-disable-line
      
      if (
        error?.response?.data?.errorCode === 1003 ||
        error?.response?.data?.errorCode === 1001
      ) {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Login failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return;
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background">
      <div className="mx-auto w-[90%] md:w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2">
          <Package2 className="h-10 w-10 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Admin Panel
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Login</CardTitle>
                <CardDescription className="text-xs md:text-base">
                  Enter your credentials to access the admin panel.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <Label htmlFor="Email">Email</Label>
                          <Input
                            id="Email"
                            type="text"
                            placeholder="Email"
                            required
                            {...field}
                          />
                        </div>
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
                      <FormControl>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sign in</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  );
}
