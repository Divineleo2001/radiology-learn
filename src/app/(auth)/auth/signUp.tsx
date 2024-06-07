"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpForm } from "@/inferedTypes";
import { signUpSchema } from "@/formSchemas";
import { SignupUser } from "@/server_actions/(auth)/signup";
import { useFormStatus } from "react-dom";

const SignUp = () => {
  const form = useForm<signUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleSubmit = async (values: signUpForm) => {
    try {
      await SignupUser(values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" md:px-5 ">
      <Form {...form}>
        <form
          className="space-y-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

<div className="md:flex gap-4 md:gap-6">

          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First Name:</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last Name:</FormLabel>
                  <FormControl>
                    <Input className="w-full" placeholder="Last Name" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
</div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Password:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Btn />
        </form>
      </Form>
    </div>
  );
};
export default SignUp;

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-4" disabled={pending} type="submit">
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
};
