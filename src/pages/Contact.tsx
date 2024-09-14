import CollapseItem from '../components/shared/CollapseItem'

function Contact() {
    return (
        <div className="py-36 px-0 sm:px-10 md:px-20">
            <div className="md:shadow-xl border px-10 md:px-20 py-0 sm:py-10 border-t-gray-100 rounded-lg">
            <h1>Contacto</h1>

            <p className="my-5">En Vitalit, estamos aquí para ayudarte en cada paso de tu camino hacia un bienestar óptimo. Si tienes preguntas, comentarios o necesitas asistencia, no dudes en ponerte en contacto con nosotros. Queremos asegurarnos de que tu experiencia con Vitalit sea siempre positiva y productiva.</p>

            <hr />
            <h2 className='font-medium text-2xl mt-5 text-purple-500'>Cómo puedes contactarnos</h2>

            <h2 className='font-medium text-xl mt-5 text-purple-500'>Soporte al Usuario</h2>
            <p>¿Tienes problemas técnicos o dudas sobre cómo utilizar nuestra plataforma? Nuestro equipo de soporte está disponible para asistirte. Puedes comunicarte con nosotros a través de:</p>

            <div className='px-5 mt-5'>
                <ol>
                    <li className='list-disc'><strong>Correo Electrónico:</strong> vvitalit.co@gmail.com</li>
                    <li className='list-disc'><strong>Teléfono:</strong> +57 3105746050</li>
                </ol>
            </div>

            <h2 className='font-medium text-xl mt-5 text-purple-500'>Consultas Generales</h2>
            Para preguntas generales sobre nuestros servicios, colaboraciones o cualquier otra inquietud, puedes contactarnos a través de:

            <div className='px-5 mt-5'>
                <ol>
                    <li className='list-disc'><strong>Correo Electrónico:</strong> vvitalit.co@gmail.com</li>
                    <li className='list-disc'><strong>Teléfono:</strong> +57 3105746050</li>
                </ol>
            </div>

            <h2 className='font-medium text-xl mt-5 text-purple-500'>Colaboraciones y Alianzas</h2>
            Si eres una empresa, gimnasio, nutricionista o un profesional del bienestar y estás interesado en colaborar con Vitalit, estaremos encantados de explorar oportunidades juntos. No dudes en contactarnos
            <h2 className='font-medium text-xl mt-5 text-purple-500'>Nuestra Ubicación</h2>

            <p className='mb-5'>Somos una plataforma digital, no contamos con sede física pero siempre estamos conectados contigo por medio de todos nuestros cánales.</p>
            <hr />
            <h2 className='font-medium text-2xl mt-5 text-purple-500'>Preguntas frecuentes</h2>
            <CollapseItem 
                title='¿Qué es Vitalit y cómo puede ayudarme?' 
                text='Vitalit es una aplicación diseñada para ayudarte a gestionar tu bienestar personal de manera integral, abarcando salud física, mental y nutricional. A través de herramientas personalizadas, Vitalit te acompaña en tu camino hacia un estilo de vida más saludable.' 
            />
            <CollapseItem 
                title='¿Cómo puedo registrarme en Vitalit?' 
                text='Registrarse en Vitalit es sencillo. abre la aplicación desde cualquier navegador y en nuestro menú encontrarás el botón para iniciar sesión, una vez en esta sección, podrás ver una opción en la parte baja de la pantalla que dice "¿No tienes cuenta? Regístrate". Proporciona datos como tu nombre, correo electrónico y una contraseña. ¡Listo! Ya puedes empezar a disfrutar de los beneficios de Vitalit.' 
            />
            <CollapseItem 
                title='¿Qué características están disponibles en la versión gratuita de Vitalit?' 
                text='La versión gratuita de Vitalit ofrece acceso a funciones básicas como laa creación de recetas, ejercicios fisicos y ejercicios de meditación. Para acceder a funcionalidades avanzadas, puedes optar por una suscripción premium.' 
            />
            <CollapseItem 
                title='¿Cómo funciona la personalización en Vitalit?' 
                text='Al registrarte, completarás una evaluación inicial sobre tus metas, estado de salud y preferencias. Con base en esta información, Vitalit generará un plan de bienestar personalizado que se adaptará continuamente según tu progreso y retroalimentación.' 
            />
            <CollapseItem 
                title='¿Cómo puedo cancelar mi suscripción?' 
                text='Puedes cancelar tu suscripción en cualquier momento a través de la configuración de la cuenta en la app. Las funcionalidades premium seguirán activas hasta el final del periodo ya pagado, pero no se realizarán reembolsos por el mes en curso.' 
            />
            <CollapseItem 
                title='¿Vitalit ofrece soporte técnico?' 
                text='Sí, si experimentas problemas técnicos o tienes alguna duda sobre el uso de la aplicación, puedes contactar a nuestro equipo de soporte técnico a través del correo electrónico o por teléfono celular y whatsapp.' 
            />
            <CollapseItem 
                title='¿Qué sucede si olvido mi contraseña?' 
                text='Puedes recuperar tu contraseña fácilmente desde la pantalla de inicio de sesión seleccionando "Olvidé mi contraseña". Sigue las instrucciones para recibir un enlace de recuperación por correo electrónico.' 
            />
            <CollapseItem 
                title='¿Cómo puedo unirme a la comunidad de Vitalit?' 
                text='Síguenos en nuestras redes sociales, en ellas podrás ver como otros usuarios disfrutan de Vitalit. Únete a la comunidad para motivarte y aprender de la experiencia de otros.' 
            />
            <CollapseItem 
                title='¿Vitalit ofrece descuentos o periodos de prueba?' 
                text='Sí, Vitalit ofrece 15 días de suscripción premium gratuita para nuevos usuarios referidos con tu código, donde puedes disfrutar de todas las funcionalidades avanzadas. Además, ocasionalmente lanzamos promociones y descuentos en nuestras suscripciones.' 
            />
            <CollapseItem 
                title='¿Qué tipo de planes de bienestar puedo crear en Vitalit?' 
                text='Puedes crear planes personalizados de entrenamiento, nutrición y salud mental. Estos planes se ajustarán dinámicamente en función de tus necesidades, objetivos y progreso.' 
            />
            <CollapseItem 
                title='¿Cómo protege Vitalit mi información personal?' 
                text='Vitalit toma muy en serio la privacidad y seguridad de tus datos. Utilizamos varias medidas de seguridad para garantizar que tu información esté protegida.' 
            />
            </div>
        </div>
    )
}

export default Contact