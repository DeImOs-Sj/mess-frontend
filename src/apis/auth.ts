import { User } from "../interfaces"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export async function loginOther(email: string, password: string): Promise<boolean> {

    try {

        const resp = await fetch(
            BACKEND_URL + "/auth/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "phoneNo": "",
                    "role": "SUPERVISOR",
                    "password": password
                  }),
            }
        )

        if (resp.status !== 200) {
            return false
        }

        const jsn = await resp.json()

        localStorage.setItem("access", jsn.tokens.access.token)

        return true


    } catch (err: any) {
        console.log(err)
        return false
    }

}



export async function loginStudent(phoneNo: string): Promise<boolean> {

    try {

        const resp = await fetch(
            BACKEND_URL + "/auth/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": "",
                    "phoneNo": phoneNo,
                    "role": "STUDENT",
                    "password": "password1"
                  }),
            }
        )

        if (resp.status !== 200) {
            return false
        }

        const jsn = await resp.json()

        localStorage.setItem("access", jsn.tokens.access.token)

        return true


    } catch (err: any) {
        console.log(err)
        return false
    }

}

export async function getMe(token: string): Promise<User | null> {

    try {

        const resp = await fetch(
            BACKEND_URL + "/users/me",
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )

        console.log(resp.status)
        if (resp.status === 200 || resp.status === 304) {

            const jsn: User = await resp.json()
            return jsn;

        }

        return null



    } catch (err: any) {
        console.log(err)
        return null
    }

}



export async function createUser (token: string, name: string, email: string, password: string, role: string): Promise<boolean> {

    console.log(email)
    try {

        const resp = await fetch(
            BACKEND_URL + "/auth/register",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phoneNo: "",
                    role: role,
                    password: password,
                })
            }
        )

        if (resp.status === 201 || resp.status === 304) {
            return true;
        }

        return false;



    } catch (err: any) {
        console.log(err)
        return false;
    }

}