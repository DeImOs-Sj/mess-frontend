import { useEffect } from "react";


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
import { loginOther } from "../../apis/auth.ts";
import { useAtom } from "jotai";
import { loginAtom } from "../../atoms/autAtom.ts";
import { useNavigate } from "react-router-dom";




const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(7).max(18),
  role: z.string().min(1, { message: "Role is required" }), // Add validation for the new field
})



export default function LoginOtherPage() {

  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedin] = useAtom(loginAtom);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "vendor"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const reslt = await loginOther(values.email,values.password);

    if (reslt === true) {
      toast({
        title: "Welcome",
        description: "You are successfully logged in",
      })
      setIsLoggedin(true);
    }

  }


  useEffect(()=>{
    
    if (isLoggedIn) {
      navigate("/");
    }

  },[isLoggedIn])

  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <p className="text-[#6b46c1] text-2xl font-bold mb-10">Manage Access Login</p>
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



            <Button onClick={form.handleSubmit(onSubmit)} className="w-full bg-[#6b46c1] transition-colors hover:bg-[#007bffd9]" >Login</Button>


          </form>
        </Form>

        <div className="p-5"></div>

      </div>

    </div>
  );
}