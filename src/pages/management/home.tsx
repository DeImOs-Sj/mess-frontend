import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { loginAtom } from "../../atoms/autAtom";


const cards_info = [
    {
        title: "Pending",
        description: "Total number of quries Pending"
    },
    {
        title: "Completed",
        description: "Total number of quries Completed"
    },
    {
        title: "Total",
        description: "Total number of quries Raised"
    },
]

export default function ManagementHome() {

    const [isLoggedIn,] = useAtom(loginAtom);
    const navigate = useNavigate();



    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login-student");
        }

    }, [isLoggedIn])


    return (
        <>

            <div className="w-full h-screen flex items-center justify-center flex-wrap mt-20">

                {
                    cards_info.map((item) => {

                        let color = "text-yellow-500"

                        if (item.title === "Pending") {
                            color = "text-yellow-500"
                        } else if (item.title === "Completed") {
                            color = "text-green-500"
                        } else {
                            color = "text-brown-500"
                        }

                        return (
                            <Card className="w-[350px] m-3">
                                <CardHeader>
                                    <CardTitle className={color}>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className={`text-lg font-semibold ${color}`}>100</p>
                                </CardContent>
                            </Card>
                        )
                    })
                }

            </div>
        </>
    )

}