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
import { useState, useTransition } from "react";
import { developerLogin } from "@/actions/developerLogin";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { DeveloperLoginSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { login } from "@/lib/features/authFeature";
import { useDispatch } from "react-redux";

const DevLogin = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DeveloperLoginSchema>>({
    resolver: zodResolver(DeveloperLoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = (values: z.infer<typeof DeveloperLoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      developerLogin(values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data?.success)
            dispatch(login({ userType: "developer", token: data.token, name: data.name }));
            console.log("Dispatched login:", { userType: "developer", token: data.token, name: data.name });
            router.push('/dashboard/developer');
          } else {
            setError(data?.error)
          }
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      onBackClick={() => router.push('/auth/developer/register')}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
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
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">
                      Forgot Password?
                    </Link>
                  </Button>
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
          >{isPending ? <BeatLoader /> : "Login"}</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default DevLogin;