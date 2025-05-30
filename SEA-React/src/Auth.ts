import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

export const setToken = (token : string)=>{

    localStorage.setItem('tokenya', token)
}

export const fetchToken = ()=>{

    return localStorage.getItem('tokenya')
}
export const setCurrentUser = (current_user : string) =>{
    localStorage.setItem('userya', current_user)
}
export const fetchCurrentUser = () =>{
    localStorage.getItem('userya')
}

export function RequireToken({children}: {children: ReactNode}){

    let auth = fetchToken()
    let navigate = useNavigate()

    if(!auth){

        navigate("/");
    } else {
        navigate("/profile");
    }

    return children;
}

