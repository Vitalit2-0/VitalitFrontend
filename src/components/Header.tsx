import Menu from "./Menu"

function Header({ setTransition } : { setTransition: any }) {
    return (
        <div className="flex justify-between pl-20 pr-20 pt-5 pb-5 fixed w-full top-0 m-0 z-50">
            <div className='m-3 pt-2'>VITALIT</div>
            <Menu setTransition={setTransition}/>
        </div>
    )
}

export default Header