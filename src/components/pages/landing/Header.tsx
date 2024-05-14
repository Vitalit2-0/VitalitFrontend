import React from "react";
import Menu from "../../shared/Menu"
import HamburguerMenu from "../../shared/HamburguerMenu";

function Header({ setTransition } : { setTransition: any }) {

    const [open, setOpen] = React.useState(false);


    window.addEventListener("scroll", () => {
        setOpen(false);
    });

    function handleOpenMobileMenu()
    {
        setOpen(!open);
    }

    return (
        <div style={{height: "115px"}} className='flex justify-between p-10 md:px-20 pt-5 pb-5 fixed bg-gradient-to-b from-white to-transparent lg:bg-transparent lg:absolute w-full top-0 m-0 z-40 transition-all'>
            <div className='flex content-center flex-wrap ml-1'>
                <img className="w-36" src="assets/images/logoVitalit.png" alt="" />
            </div>
            <Menu setTransition={setTransition}/>
            <HamburguerMenu onClick={handleOpenMobileMenu} open={open}/>
            <Menu setTransition={setTransition} responsive={true} open={open}/>
        </div>
    )
}

export default Header