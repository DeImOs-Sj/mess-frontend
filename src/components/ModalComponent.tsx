import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
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
import { Calendar } from "./ui/calendar";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";
import { useForm, Controller } from "react-hook-form";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ComponentInterface {
  data: any
}

const Component: React.FC<ComponentInterface> = ({ data }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const form = useForm({
    defaultValues: {
      email: data.email || "",
      student_name: data.student || "",
      student_phno: data.phone || "",
      college_name: data.college || "",
      campus: data.campus || "Ambegaon",
      mess: data.mess || "Sinhgad Rohini Mess",
      date_of_happening: data.date_of_happening || "",
      meal_time: data.meal_time || "LUNCH",
      complaint_category: data.complaint_category || "FOOD_QUALITY",
      is_clean: data.is_clean || "YES",
      is_pest_controlled: data.is_pest_controlled || "NO",
      food_handler_protocols: data.food_handler_protocols || "Yes",
      complaint_desc: data.foodRelatedComplaints || "",
      suggestion_improvement: data.suggestions || "",
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] xs:max-h-[900px]">
        <div className="w-full grid gap-6 bg-white p-10 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Student Complaint</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="xs:max-h-[900px]">
              <fieldset className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
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
                          <SelectTrigger
                            id="campus-dropdown"
                            className="w-full"
                          >
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
                                Sinhgad Rohini Mess
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
                                form.setValue(
                                  "date_of_happening",
                                  selectedDate!
                                );
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
                          <SelectTrigger
                            id="meal-time-dropdown"
                            className="w-full"
                          >
                            <SelectValue placeholder="Select an answer" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              <SelectItem value="BREAKFAST">
                                Breakfast
                              </SelectItem>
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
                          <SelectTrigger
                            id="category-dropdown"
                            className="w-full"
                          >
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
                          <SelectTrigger
                            id="isclean-dropdown"
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
                <Controller
                  control={form.control}
                  name="is_pest_controlled"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pest Control Done in Dining Hall</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger
                            id="is-pest-dropdown"
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
                        <Input
                          placeholder="Food complaints if any"
                          {...field}
                        />
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
              </fieldset>
            </form>
          </Form>
        </div>
        {/* <DialogFooter>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
          <Button type="submit">Confirm</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}


export default Component;