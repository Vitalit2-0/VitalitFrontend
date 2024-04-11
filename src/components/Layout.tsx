import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationCenter from './NotificationCenter';

function Layout() {
    return (
        <div className='relative'>
            <Sidebar/>
            <NotificationCenter/>
            <Outlet/> 
        </div>
    );
}

export default Layout