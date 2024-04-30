import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
    return (
        <div className='relative'>
            <Sidebar/>
            <div>
                <Outlet/> 
            </div>
        </div>
    );
}

export default Layout