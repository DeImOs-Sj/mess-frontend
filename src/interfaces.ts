

export interface User {
    id: string,
    email: string,
    name: string,
    role: string
}


export interface Complaint {
    email: string,
    campus: string,
    mess: string,
    date_of_happening: Date,
    student_name: string,
    student_phno: string,
    college_name: string,
    is_clean: string,
    is_pest_controlled: string,
    food_handler_protocols: string,
    complaint_desc: string,
    suggestion_improvement: string,
    complaint_category: string,
    meal_time: string,
    image_photos: string[],
}


export interface DashboardData {
    pending: number,
    resolved: number,
    total: number
}

export type MessInfo = {
    id: number
    campus: string
    mess: string
    date_of_happening: string
    is_clean: boolean
    status: number
    meal_time: string
    createdAt: string
};