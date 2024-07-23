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


const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  campus: z.string(),
  mess: z.string(),
  date_of_happening: z.date(),
  student_name: z.string(),
  student_phno: z.string(),
  college_name: z.string(),
  is_clean: z.string().default("false"),
  is_pest_controlled: z.string().default("false"),
  food_handler_protocols: z.string().default("false"),
  complaint_desc: z.string(),
  suggestion_improvement: z.string(),
  complaint_category: z.string(),
  meal_time: z.string().default("LUNCH"),
  image_photos: z.array(z.string()),
})



export function StudentForm() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

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
      image_photos: [],
    },
  })

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
                          <SelectItem value="Sinhgad Rohini Mess">Sinhgad Rohini Mess</SelectItem>
                          <SelectItem value="Sinhgad Rakesh Mess">Sinhgad Rakesh Mess</SelectItem>
                          <SelectItem value="Sinhgad Ram Mess">Sinhgad Ram Mess</SelectItem>
                          <SelectItem value="Sinhgad Sham Mess">Sinhgad Sham Mess</SelectItem>
                          <SelectItem value="Sinhgad Generic Mess">Sinhgad Generic Mess</SelectItem>
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
              name="is_clean"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hygiene Environment in Dining Hall </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
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
                      <SelectTrigger id="mess-dropdown" className="w-full">
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
                  <FormLabel>Food Handlers Following Protocols</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
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
                  <FormLabel>Suggestion for Improvements</FormLabel>
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
            <Controller
              control={form.control}
              name="complaint_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category of Complaints</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
                        <SelectValue placeholder="Select an answer" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectItem value="FOOD_QUALITY">Food Quality</SelectItem>
                          <SelectItem value="CLEANLINESS">Cleanliness</SelectItem>
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
              name="meal_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Time</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="mess-dropdown" className="w-full">
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
            <Button type="submit" className="col-span-2 mt-6 bg-[#6D52C1]">
              Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
