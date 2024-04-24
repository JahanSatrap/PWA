import Avatar from 'react-avatar';

import { useAppSelector, useAppDispatch } from "../../../../redux-toolkit/store/hooks"
import { IoIosLogOut } from "react-icons/io";
import { logout } from '../../../../redux-toolkit/features/authentication/authentication-slice';

import './style.css'

const Header = () => {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="DashHeaderMainContainer">
            <div className="DashHeaderLeftContainer">
                <Avatar name={auth.user.username} className="DashHeaderAvatar" size="70"/>
                <div>{auth.user.username}</div>
            </div>
            <div className="DashHeaderLogout" onClick={onLogout}>
                <IoIosLogOut size={50}/>
            </div>
        </div>
    )
}

export default Header