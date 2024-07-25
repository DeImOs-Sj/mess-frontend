import { Complaint, DashboardData, MessInfo } from "../interfaces"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export async function createComplaint(token: string, complaint: Complaint): Promise<boolean> {

    try {

        const resp = await fetch(
            BACKEND_URL + "/complaint",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: complaint.email,
                    campus: complaint.campus,
                    mess: complaint.mess,
                    date_of_happening: complaint.date_of_happening,
                    student_name: complaint.student_name,
                    student_phno: complaint.student_phno,
                    college_name: complaint.college_name,
                    is_clean: JSON.parse(complaint.is_clean),
                    is_pest_controlled: JSON.parse(complaint.is_pest_controlled),
                    food_handler_protocols: JSON.parse(complaint.food_handler_protocols),
                    complaint_desc: complaint.complaint_desc,
                    suggestion_improvement: complaint.suggestion_improvement,
                    complaint_category: complaint.complaint_category,
                    meal_time: complaint.meal_time,
                    image_photos: [],
                }),
            }
        )

        if (resp.status !== 201) {
            return false
        }

        return true


    } catch (err: any) {
        console.log(err)
        return false
    }

}



export async function getDashboard(token: string): Promise<DashboardData | null> {

    try {

        const resp = await fetch(
            BACKEND_URL + "/complaint/dashboard",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
    
        if (resp.status !== 200) {
            return null;
        }
        
        const jsn: DashboardData = await resp.json();


        return jsn;


    } catch (err: any) {
        console.log(err)
        return null
    }

}



export async function getComplaints(token: string, status: number): Promise<MessInfo[]> {

    try {

        const resp = await fetch(
            BACKEND_URL + `/complaint?page=1&limit=100&sortBy=createdAt&status=${status}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
    
        if (resp.status !== 200) {
            return [];
        }
        
        const jsn: MessInfo[] = await resp.json();


        return jsn;


    } catch (err: any) {
        console.log(err)
        return []
    }

}