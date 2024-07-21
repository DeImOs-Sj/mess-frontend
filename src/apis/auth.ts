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
                    email,
                    password
                }),
            }
        )

        if (resp.status !== 200) {
            return false
        }

        const jsn = await resp.json()


        console.log(jsn, "=====")
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