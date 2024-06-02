import GradientButton from '../helpers/GradientButton'
import NavigationManager from '../../services/NavigationManager'

function Menu({setTransition, color, responsive, open, setPrivacy} : {setTransition: any, open?:boolean, color?: string, responsive?: boolean, setPrivacy: any}) {
    
    function handleScroll(e: any, section: string) {
        e.preventDefault();
        NavigationManager.scrollTo(section);
    }
    
    return (
        <div className={`${responsive ? "block fixed h-screen right-0 top-0 shadow-2xl bg-white transition-all" : "lg:block hidden"} ${responsive && open ? "w-[290px] md:w-[340px]" : (responsive ? "w-0" : "")}`}>
            <nav className='h-full'>
                <ul className={`flex ${responsive ? "flex-col justify-start p-10 pt-7" : "items-center"} gap-10 flex-wrap h-full'`}>
                    {responsive && <li className=''>
                        <GradientButton text="Iniciar Sesión" onClick={setTransition} className='base-gradient'/>
                    </li>}
                    <li className='flex flex-wrap content-center'>
                        <a onClick={(e) => {setPrivacy(false); handleScroll(e, "inicio")}} className={color}>Inicio</a>
                    </li>
                    <li className='flex flex-wrap content-center'>
                        <a onClick={(e) => {setPrivacy(false); handleScroll(e, "vitalit")}} className={color}>Vitalit</a>
                    </li>
                    <li className='flex flex-wrap content-center'>
                        <a onClick={(e) => {setPrivacy(false); handleScroll(e, "mission-vision")}} className={color}>Misión y vision</a>
                    </li>
                    <li className='flex flex-wrap content-center'>
                        <a onClick={(e) => {setPrivacy(false); handleScroll(e, "unete")}} className={color}>Únete</a>
                    </li>
                    <li onClick={() => setPrivacy(true)} className='flex flex-wrap content-center cursor-pointer'>
                        <a className={color}>Política de privacidad</a>
                    </li>
                    {!responsive && <li className=''>
                        <GradientButton text="Iniciar Sesión" onClick={setTransition} className='base-gradient'/>
                    </li>}
                </ul>
            </nav>
        </div>
    )
}

export default Menu