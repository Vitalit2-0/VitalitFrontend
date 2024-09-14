import React from "react";
import Popper from "popper.js";
import { Link } from "react-router-dom";

const Dropdown = ({ className, setOpen } : { className : string | undefined, setOpen? : any }) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef<HTMLButtonElement>();
    const popoverDropdownRef = React.createRef<HTMLDivElement>();
    const openDropdownPopover = () => {
        if (btnDropdownRef.current && popoverDropdownRef.current)
        {
            new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start"
            });
            setDropdownPopoverShow(true);
        }
    };
    
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const handleOnClick = () => {
        closeDropdownPopover();
        setOpen(!open);
    }
    
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={`focus:outline-none font-medium h-auto ${className}`}
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              Nosotros
            </button>
            <div
              ref={popoverDropdownRef}
              className={(dropdownPopoverShow ? "block " : "hidden ") + "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"}
              style={{ minWidth: "12rem" }}
            >
              <Link to={"/who-we-are"} 
                onClick={() => handleOnClick()}
                className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800" 
              >
                ¿Quienes somos?
              </Link>
              <Link to={"/contact"} 
                onClick={() => handleOnClick()}
                className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800" 
              >
                Contacto
              </Link>
              <Link to={"/privacy-policy"} 
                onClick={() => handleOnClick()}
                className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800" 
              >
                Política de privacidad
              </Link>
              <Link to={"/user-manual"} 
                onClick={() => handleOnClick()}
                className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800" 
              >
                Manual de usuario
              </Link>
              <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
              <Link to={"/blog"} 
                onClick={() => handleOnClick()}
                className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800" 
              >
                Blog Vitalit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender({ className, setOpen } : { className : string | undefined, setOpen?: any }) {
  return (
    <>
      <Dropdown className={className} setOpen={setOpen} />
    </>
  );
}
