import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Shadcn Imports
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { userDetailsAtom } from "../../atoms/autAtom.ts";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form.tsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { useToast } from "../../components/ui/use-toast.ts";
import { createUser } from "../../apis/auth.ts";
import { useAtom } from "jotai";
import { loginAtom } from "../../atoms/autAtom.ts";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().max(40),
  email: z.string().email({ message: "Invalid Email" }),
  role: z.string().min(1, { message: "Role is required" }), // Add validation for the new field
});

interface RoleBasedAccess {
  SUPERVISOR: string[];
  RESIDENT_OFFICER: string[];
  CAMPUS_DIRECTOR: string[];
  COMMITTEE: string[];
}

export default function CreateManagerScreen() {
  const { toast } = useToast();
  const [userDetail] = useAtom(userDetailsAtom);
  const [isLoggedIn,] = useAtom(loginAtom);
  const [currentRole, setCurrentRole] = useState("SUPERVISOR");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "MANAGER",
    },
  });

  const roleBasedAccess: RoleBasedAccess = {
    SUPERVISOR: ["MANAGER"],
    RESIDENT_OFFICER: ["MANAGER", "SUPERVISOR"],
    CAMPUS_DIRECTOR: ["RESIDENT_OFFICER"],
    COMMITTEE: ["CAMPUS_DIRECTOR"],
  };

  const getAvailableRoles = () => {
    if (currentRole in roleBasedAccess) {
      return roleBasedAccess[currentRole];
    }
    return [];
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login-student");
    } else {
      // Set the currentRole based on the user's role
      setCurrentRole(userDetail?.role!);
    }
  }, [isLoggedIn, userDetail]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const authToken = localStorage.getItem("access");
    const reslt = await createUser(
      authToken!,
      values.name,
      values.email,
      "password1",
      values.role
    );

    if (reslt === true) {
      toast({
        title: "User Created",
        description: `${values.role} is successfully created!`,
      });
      form.reset();
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-3">
      <p className="text-[#6b46c1] text-2xl font-bold mb-10">
        Create Management User
      </p>
      <div className="lg:w-[50%] w-full bg-white p-5 shadow-lg rounded-lg">
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="rakesh sharma" {...field} />
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
                      type="email"
                      placeholder="rakesh@sinhgad.edu"
                      {...field}
                    />
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Type</FormLabel>
                  <FormControl className="bg-red-500 w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableRoles().map((role: string) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-[#6b46c1] transition-colors hover:bg-[#5f3eac]"
            >
              Create User
            </Button>
          </form>
        </Form>

        <div className="p-5"></div>
      </div>
    </div>
  );
}
