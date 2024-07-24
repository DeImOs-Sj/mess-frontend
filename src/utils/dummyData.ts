export const data: StudentForm = {
  email: "shlok@gmail.com",
  student: "Shlok",
  phone: "1234567890",
  college: "Sinhgad College",
  foodRelatedComplaints: "Food is not good",
  suggestions: "Please improve the quality of food",
};

export interface StudentForm {
  email: string;
  student: string;
  phone: string;
  college: string;
  foodRelatedComplaints: string;
  suggestions: string;
}
