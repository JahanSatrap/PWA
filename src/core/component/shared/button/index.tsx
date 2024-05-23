import { IInputComponentPropsType } from "../../../../constant/types/components/shared/input-component-type"

import "./style.css"
import {ThreeDots} from 'react-loader-spinner'

const height = window.innerHeight
const width = window.innerWidth

const Button = ({text,loading, disabled=false,...props}:IInputComponentPropsType) => {
  return (
        <button
            disabled = {disabled}
            {...props}
            className={`${props.className} ${disabled ? "disabled": null}`}
        >
              <div className="generalButtonContainer">
                {loading
                  ?
                  <ThreeDots
                    visible={true}
                    width= {width * 0.08}
                    color="white"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{display:'flex',justifyContent:"center"}}
                    wrapperClass=""
                  />
                  :
                  <>
                    {text}
                    {props.endadornment} 
                  </>
                  }

                  </div>
        </button>
    )
}

export default Button