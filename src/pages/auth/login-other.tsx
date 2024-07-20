import { useState } from "react";


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


// Shadcn Imports
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input.tsx"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

import { useToast } from "../../components/ui/use-toast.ts";




const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(7).max(18),
  otp: z.string().min(4).max(4),
  role: z.string().min(1, { message: "Role is required" }), // Add validation for the new field
})



export default function LoginOtherPage() {

  const [optSent, setOTPSent] = useState(false);
  const { toast } = useToast();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "0000",
      role: "vendor"
    },
  })

  function onSubmitPhoneNo(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setOTPSent(true);
    toast({
      title: "OTP Sent",
      description: "Check your messages, otp sent successfully",
    })
  }


  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <p className="text-blue-500 text-2xl font-bold mb-10">Manage Access Login</p>
      <div className="lg:w-[50%] sm:w-full bg-white p-5 shadow-lg rounded-lg">

        <Form {...form}>
          <form className="space-y-5">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="rakesh@sinhgad.edu" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter sinhgad education email
                  </FormDescription>
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Type</FormLabel>
                  <FormControl className="bg-red-500 w-full">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vendor">Vendor / Manager</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="resident_officer">Resident Officer / Estate Officer</SelectItem>
                        <SelectItem value="campus_director">Campus Director</SelectItem>
                        <SelectItem value="committee">Committee</SelectItem>

                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button onClick={form.handleSubmit(onSubmitPhoneNo)} type="submit" className="w-full bg-[#007bff] transition-colors hover:bg-[#007bffd9]" >Login</Button>


          </form>
        </Form>

        <div className="p-5"></div>

      </div>

      <div className="w-full flex flex-col items-center mt-8 text-[#000000b7]">
        <p>Not a Student?</p>
        <a href="" className="text-sm underline text-blue-500">Click here</a>
      </div>
    </div>
  );
}