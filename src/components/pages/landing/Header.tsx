import React from "react";
import Menu from "../../shared/Menu"

function Header({ setTransition } : { setTransition: any }) {

    const [transparency, setTransparency] = React.useState(false);

    React.useEffect(() => {
        
    }, [transparency]);

    window.addEventListener("scroll", () => {
        setTransparency(window.scrollY > 0);
    });

    return (
        <div style={{height: "115px"}} className='flex justify-between pl-20 pr-20 pt-5 pb-5 absolute w-full top-0 m-0 z-40 transition-all'>
            <div className='flex content-center flex-wrap ml-1'>
                <img className="w-36" src="assets/images/logoVitalit.png" alt="" />
            </div>
            <Menu setTransition={setTransition}/>
        </div>
    )
}

export default Header