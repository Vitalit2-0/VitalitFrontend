import React from 'react'
import NavigationButton from './helpers/NavigationButton'

function Menu() {
    return (
        <div>
            <nav>
                <ul className='flex align-middle content-center'>
                    <li className='m-3 p-2 mt-4'>
                        <a href="#">Inicio</a>
                    </li>
                    <li className='m-3 p-2 mt-4'>
                        <a href="#">Vitalit</a>
                    </li>
                    <li className='m-3 p-2 mt-4'>
                        <a href="#">Misión y vision</a>
                    </li>
                    <li className='m-3 p-2 mt-4'>
                        <a href="#">Únete</a>
                    </li>
                    <li className='m-3 p-2 mt-4'>
                        <a href="#">Nosotros</a>
                        <ul className="sub-menu" style={{display: "none"}}>
                            <li><a href="#">¿Quienes somos?</a></li>
                            <li><a href="#">Contáctenos</a></li>
                            <li><a href="#">PQRS</a></li>
                            <li><a href="#">Política de privacidad</a></li>
                        </ul>
                    </li>
                    <li className='m-3 p-2'>
                        <NavigationButton page="/login" text="Iniciar Sesión" />
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu