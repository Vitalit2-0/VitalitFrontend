import GradientButton from './helpers/GradientButton'

function Menu({setTransition} : {setTransition: any}) {
    return (
        <div>
            <nav className='h-full'>
                <ul className='flex flex-wrap content-center h-full'>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#">Inicio</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#">Vitalit</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#">Misión y vision</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#">Únete</a>
                    </li>
                    <li className='mr-10 flex flex-wrap content-center'>
                        <a href="#">Nosotros</a>
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