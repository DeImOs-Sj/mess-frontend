import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { loginAtom } from "../../atoms/autAtom";
import { DashboardData } from "../../interfaces";
import { getDashboard } from "../../apis/complaint";


const cards_info = [
    {
        title: "Pending",
        description: "Total number of quries Pending"
    },
    {
        title: "Resolved",
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
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        pending: 0,
        resolved: 0,
        total: 0
    })


    const getDashboardData = async () => {
        const token = localStorage.getItem("access")
        let dashboardData = await getDashboard(token!);
        if (dashboardData !== null) {
            setDashboardData(dashboardData);
        }
    }


    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login-student");
        }

        getDashboardData();

    }, [isLoggedIn])


    return (
        <>

            <div className="w-full h-screen flex items-center justify-center flex-wrap mt-20">

                {
                    cards_info.map((item) => {

                        let color = "text-yellow-500"

                        if (item.title === "Pending") {
                            color = "text-yellow-500"
                        } else if (item.title === "Resolved") {
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
                                <p className={`text-lg font-semibold ${color}`}>
                                    {
                                        item.title === "Pending" && dashboardData.pending
                                    }
                                    {
                                        item.title === "Resolved" && dashboardData.resolved
                                    }
                                    {
                                        item.title === "Total" && dashboardData.total
                                    }
                                </p>
                                </CardContent>
                            </Card>
                        )
                    })
                }

            </div>
        </>
    )

}