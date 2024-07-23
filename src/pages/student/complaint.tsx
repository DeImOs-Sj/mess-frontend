import { loginAtom, userDetailsAtom } from "../../atoms/autAtom";
import { StudentForm } from "../../components/StudentForm";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function ComplaintScreen() {

    const [isLoggedIn,] = useAtom(loginAtom);
    const [userDetail,] = useAtom(userDetailsAtom);

    const navigate = useNavigate();



    useEffect(() => {

        if (!isLoggedIn && userDetail?.role !== "STUDENT") {
            navigate("/login-student");
        }

    }, [isLoggedIn])


    return (
        <div className="w-full p-10 flex flex-col items-center">
            <p className="text-[#6b46c1] text-2xl font-bold mb-10">Food Complaint</p>
            <StudentForm />
        </div>
    )
} 