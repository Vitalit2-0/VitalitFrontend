import Menu from "./Menu"

function Header() {
    return (
        <div className="flex justify-between pl-10 pr-10 pt-5 pb-5 fixed w-full top-0 m-0">
            <div className='m-3 p-2'>VITALIT</div>
            <Menu/>
        </div>
    )
}

export default Header