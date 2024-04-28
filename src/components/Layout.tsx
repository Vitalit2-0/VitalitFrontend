import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
    return (
        <div className='relative'>
            <Sidebar/>
            <div className='pt-10'>
                <Outlet/> 
            </div>
        </div>
    );
}

export default Layout