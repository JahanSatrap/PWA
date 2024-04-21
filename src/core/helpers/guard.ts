import { useNavigate } from "react-router"


export function useGuardStateFromNull<T>(state:T){
    const navigate = useNavigate()
    return () => {
        if (!state){
            navigate('/')
        }
    }
}