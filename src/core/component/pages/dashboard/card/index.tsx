import "./style.css"

import { useNavigate } from "react-router"

const Card = (props:{text:string, isActive:boolean, path?:string,routeParams?: any}) => {
    const navigate = useNavigate()
    const navigateHandler = () => {
        if (props.path)
        navigate(props.path,{state:props.routeParams})
    }
    return (
        <div 
            data-inactive={!props.isActive} 
            className={`dashCardContainer ${!props.isActive ? 'dashCardContainer-inactive' : ""}`}
            onClick={navigateHandler}
        >
            <span>{props.text}</span>
        </div>
    )
}

export default Card