import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
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

const formSchema = z.object({
  email: z.string().email({ message: "Input must be a valid email address" }),
  password: z.string().min(6, {
    message: "All passwords are longer than or equal to 6 character",
  }),
});

export const Login = () => {
  const { toast } = useToast();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (email: string, password: string) => {
    setLoginLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Error 😬",
        description: `${error}`,
      });
      setTimeout(() => {
        setLoginLoading(false);
      }, 2000);
      redirect("/admin");
    } else {
      console.log(data);
      toast({
        variant: "success",
        title: "Success 🎉",
        description: "Logged in successfully!",
      });
      setTimeout(() => {
        setLoginLoading(false);
      }, 2000);
    }
  };

  const logOut = async () => {
    setLogoutLoading(true);
    await supabase.auth
      .signOut()
      .then(() => {
        sessionStorage.removeItem("token");
        toast({
          variant: "success",
          title: "Success 🎉",
          description: "Signed out successfully!",
        });
        setTimeout(() => {
          setLogoutLoading(false);
          redirect("/admin");
        }, 2000);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error 😬",
          description: `${error}`,
        });
        setTimeout(() => {
          setLogoutLoading(false);
        }, 2000);
      });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values.email, values.password);
  };

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
          {loginLoading ? (
            <div className="flex items-center justify-center">
              <CircleNotch
                size={96}
                weight="bold"
                className="animate-spin text-ch-dark dark:text-ch-light"
              />
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
          )}
        </div>
      </div>
    </div>
  );
};
