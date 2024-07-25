import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComplaint } from "../apis/complaint";
import { useToast } from "./ui/use-toast";
import { Complaint } from "../interfaces";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  campus: z.string(),
  mess: z.string(),
  date_of_happening: z.date(),
  student_name: z.string(),
  student_phno: z.string(),
  college_name: z.string(),
  is_clean: z.string(),
  is_pest_controlled: z.string(),
  food_handler_protocols: z.string(),
  complaint_desc: z.string(),
  suggestion_improvement: z.string(),
  complaint_category: z.string(),
  meal_time: z.string().default("LUNCH"),
});

export function StudentForm() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const { toast } = useToast();
  // const [isLoggedIn, setIsLoggedin] = useAtom(loginAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      campus: "Ambegaon",
      mess: "Sinhgad Rohini Mess",
      date_of_happening: new Date(),
      student_name: "",
      student_phno: "",
      college_name: "",
      is_clean: "false",
      is_pest_controlled: "false",
      food_handler_protocols: "false",
      complaint_desc: "",
      suggestion_improvement: "",
      complaint_category: "",
      meal_time: "BREAKFAST",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("====");
    const complaint: Complaint = {
      email: values.email,
      campus: values.campus,
      mess: values.mess,
      date_of_happening: values.date_of_happening,
      student_name: values.student_name,
      student_phno: values.student_phno,
      college_name: values.college_name,
      is_clean: values.is_clean,
      is_pest_controlled: values.is_pest_controlled,
      food_handler_protocols: values.food_handler_protocols,
      complaint_desc: values.complaint_desc,
      suggestion_improvement: values.suggestion_improvement,
      complaint_category: values.complaint_category,
      meal_time: values.meal_time,
      image_photos: [],
    };

    const authToken = localStorage.getItem("access");
    const reslt = await createComplaint(authToken!, complaint);

    if (reslt === true) {
      toast({
        title: "Raise",
        description: "Complaint successfully raised",
      });

      form.reset();
    }
  }

  return (
    <div className="w-full grid gap-6 bg-white p-10 rounded-lg shadow-lg">
      <Form {...form}>
        <form>
          <fieldset className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Student</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student_phno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="college_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name and Class</FormLabel>
                  <FormControl>
                    <Input placeholder="NBN Sinhgad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="campus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Campus</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="campus-dropdown" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="Ambegaon">Ambegaon</SelectItem>
                          <SelectItem value="RMD">RMD</SelectItem>
                          <SelectItem value="Kolhapur">Kolhapur</SelectItem>
                          <SelectItem value="Lonavala">Lonavala</SelectItem>
                          <SelectItem value="Nahre">Nahre</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="mess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Mess</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="w-full h-[300px] overflow-y-scroll">
                        <SelectGroup>
                          <SelectItem value="Sinhgad Rohini Mess">
                            Sinhgad Annapurna Mess
                          </SelectItem>
                          <SelectItem value="Sinhgad Rohini Mess">
                            Sinhgad Amrapali Mess
                          </SelectItem>
                          <SelectItem value="Sinhgad Rohini Mess">
                            Sinhgad Deepali Mess
                          </SelectItem>
                          <SelectItem value="Sinhgad Rakesh Mess">
                            Sinhgad Rakesh Mess
                          </SelectItem>
                          <SelectItem value="Sinhgad Ram Mess">
                            Sinhgad Ram Mess
                          </SelectItem>
                          <SelectItem value="Sinhgad Sham Mess">
                            Sinhgad Sham Mess
                          </SelectItem>
                          <SelectItem value="Sinhgad Generic Mess">
                            Sinhgad Generic Mess
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="date_of_happening"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-[2rem]",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            form.setValue("date_of_happening", selectedDate!);
                            field.onChange(selectedDate);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="meal_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Time</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="meal-time-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                          <SelectItem value="LUNCH">Lunch</SelectItem>
                          <SelectItem value="DINNER">Dinner</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="complaint_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category of Complaints</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="category-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="FOOD_QUALITY">
                            Food Quality
                          </SelectItem>
                          <SelectItem value="CLEANLINESS">
                            Cleanliness
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="is_clean"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hygiene Environment in Dining Hall </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="isclean-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="is_pest_controlled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pest Control Done in Dining Hall</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="is-pest-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="food_handler_protocols"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow Necessary Protocols</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="food-handler-dropdown"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complaint_desc"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Food Related Complaints</FormLabel>
                  <FormControl>
                    <Input placeholder="Food complaints if any" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suggestion_improvement"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Suggestion If Any</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=" Any suggestion for improvements"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="col-span-2 mt-6 bg-[#6b46c1] hover:bg-[#5f3eac]"
            >
              Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
