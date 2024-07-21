import { useAtom } from "jotai";
import { loginAtom } from "../atoms/autAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ManagementHome from "./management/home";


export default function Home() {

    const [isLoggedIn,] = useAtom(loginAtom);

    const navigate = useNavigate();


    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login-student");
        }

    }, [])

    return <ManagementHome/>

}