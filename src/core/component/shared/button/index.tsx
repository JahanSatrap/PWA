import { IInputComponentPropsType } from "../../../../constant/types/components/shared/input-component-type"

import "./style.css"
import {ThreeDots} from 'react-loader-spinner'

const Button = ({text,loading, disabled=false,...props}:IInputComponentPropsType) => {
  return (
        <button
            disabled = {disabled}
            {...props}
            className={`${props.className} ${disabled ? "disabled": null}`}
        >
            <span>
                {loading
                  ?
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="white"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{display:'flex',justifyContent:"center"}}
                    wrapperClass=""
                  />
                  :
                  <div className="generalButtonContainer">
                    {text}
                    {props.endAdornment} 
                  </div>
                }

            </span>
        </button>
    )
}

export default Button