"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { startTransition, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DeveloperRegisterSchema } from "@/lib/schemas";
import { developerRegister } from "@/actions/developerRegister";
import { BeatLoader } from "react-spinners";

const DevRegister = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof DeveloperRegisterSchema>>({
    resolver: zodResolver(DeveloperRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  });
  const onSubmit = (values: z.infer<typeof DeveloperRegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      developerRegister(values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data?.success)
            setTimeout(() => {
              router.push('/auth/developer/login');
            }, 5000)
          }
          setError(data?.error)
        })
    })
  }
  return (
    <CardWrapper
      headerLabel="Find Your Next Opportunity"
      backButtonHref="/auth/developer/login"
      backButtonLabel="Already have an account?"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
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
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            {isPending ? <BeatLoader /> : "Create an account"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default DevRegister