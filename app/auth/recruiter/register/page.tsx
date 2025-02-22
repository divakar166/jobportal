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
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RecruiterRegisterSchema } from "@/lib/schemas";
import { recruiterRegister } from "@/actions/recruiter";
import { BeatLoader } from "react-spinners";

const RecruiterRegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof RecruiterRegisterSchema>>({
    resolver: zodResolver(RecruiterRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      mobile: ""
    }
  });
  const onSubmit = (values: z.infer<typeof RecruiterRegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      recruiterRegister(values)
        .then((data) => {
          if (data?.success) {
            setSuccess(data?.success)
            setTimeout(() => {
              router.push('/auth/recruiter/login');
            }, 5000)
          }
          setError(data?.error)
        })
    })
  }
  return (
    <CardWrapper
      headerLabel="Hire Talent"
      backButtonLabel="Already have an account?"
      onBackClick={() => router.push('/auth/recruiter/login')}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div className="flex w-full items-center space-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="XYZ Tech Pvt Ltd"
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
                  <FormItem className="w-full">
                    <FormLabel>Company Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@xyztech.in"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="-91 952 158 1251"
                      type="text"
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
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? <BeatLoader color="#9333EA" /> : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RecruiterRegisterForm