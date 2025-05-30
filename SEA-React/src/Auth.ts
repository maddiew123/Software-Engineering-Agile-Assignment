import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

export const setToken = (token : string)=>{

    localStorage.setItem('tokenyah', token)
}

export const fetchToken = ()=>{

    return localStorage.getItem('temitope')
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

