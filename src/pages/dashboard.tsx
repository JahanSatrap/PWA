import React from 'react'
import { DashboardCard, DashboardHeader } from '../core/component'
import {motion} from "framer-motion"

import './style.css'

const Dashboard = () => {
    return (
        <div className="generalMainContainer">
            <DashboardHeader/>
            <motion.div 
                className='dashCardsContainer'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                <DashboardCard text="باشگاه" isActive={true} path="/scanner" routeParams={{"isDefine":true}} />
                <DashboardCard text="بولینگ" isActive={false} />
                <DashboardCard text="فروشگاه" isActive={false} />
                <DashboardCard text="فوتسال" isActive={false} />

            </motion.div> 
        </div>
    )
}
export default Dashboard