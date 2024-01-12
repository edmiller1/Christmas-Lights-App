import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { auth } from "../../../../lib/firebase";
import logo from "../../../../assets/ChristmasLights-House-Logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleNotch } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from "@/lib/hooks";

const formSchema = z.object({
  email: z.string().email({ message: "Input must be a valid email address" }),
  password: z.string().min(6, {
    message: "All passwords are longer than or equal to 6 character",
  }),
});

export const Login = () => {
  const currentUser = useUserData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (email: string, password: string) => {
    setLoginLoading(true);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Logged in successfully!",
        });
        sessionStorage.setItem("token", res.user!.refreshToken);
        setTimeout(() => {
          setLoginLoading(false);
          navigate("/admin");
        }, 2000);
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: "Failed to login. Please try again.",
        });
        setTimeout(() => {
          setLoginLoading(false);
        }, 2000);
      });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values.email, values.password);
  };

  if (loginLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <CircleNotch
          size={96}
          weight="bold"
          className="animate-spin text-ch-dark dark:text-ch-light"
        />
        <span className="text-xl">Logging In...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Link
        to="/"
        className="flex items-center space-x-3 py-5 px-5 text-ch-red hover:text-ch-red-hover"
      >
        <ArrowLeft size={20} weight="bold" />
        <span>Back to Christmas Lights</span>
      </Link>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-32 w-auto" src={logo} alt="Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-ch-red px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ch-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ch-red"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
