import GradientButton from '../helpers/GradientButton'

function Menu({setTransition, color} : {setTransition: any, color?: string}) {
    return (
        <div>
            <nav className='h-full'>
                <ul className='flex flex-wrap content-center h-full'>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#" className={color}>Inicio</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#vitalit" className={color}>Vitalit</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#mission-vision" className={color}>Misión y vision</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#unete" className={color}>Únete</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#" className={color}>Nosotros</a>
                        <ul className="sub-menu" style={{display: "none"}}>
                            <li><a href="#">¿Quienes somos?</a></li>
                            <li><a href="#">Contáctenos</a></li>
                            <li><a href="#">PQRS</a></li>
                            <li><a href="#">Política de privacidad</a></li>
                        </ul>
                    </li>
                    <li className=''>
                        <GradientButton text="Iniciar Sesión" onClick={setTransition} className='base-gradient'/>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu