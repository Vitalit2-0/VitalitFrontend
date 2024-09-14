
function WhoWeAre() {
    return (
        <div className="py-36 px-0 sm:px-10 md:px-20">
            <div className="md:shadow-xl border px-10 md:px-20 py-0 sm:py-10 border-t-gray-100 rounded-lg">
                <h1>Quiénes Somos</h1>
                <p className="mt-5">En Vitalit, somos un equipo comprometido con transformar la manera en que las personas gestionan su bienestar personal. Nuestra misión es brindar servicios de acompañamiento y gestión personalizada para mejorar la salud mental y física de nuestros usuarios. Lo logramos a través de una plataforma integral que combina tecnología avanzada con un enfoque humano, ofreciendo herramientas que facilitan una gestión sencilla y efectiva del bienestar personal.</p>
                <p className="mt-5">Nuestro objetivo es convertirnos en el referente por excelencia en la promoción del cuidado físico y mental, fomentando la participación activa, el aprendizaje continuo y una comunicación abierta y transparente. Para el año 2027, aspiramos a ser reconocidos como líderes en el ámbito del bienestar personal, impactando positivamente la vida de nuestros usuarios y ayudándoles a alcanzar sus metas de salud.</p>
                <p className="mt-5">Creemos en la importancia de un enfoque que abarca lo físico, lo mental y lo nutricional, adaptándose a las necesidades únicas de cada persona. Ya sea que busques mejorar tu estado físico, gestionar mejor tu alimentación, o encontrar equilibrio emocional, Vitalit está diseñado para simplificar y personalizar tu camino hacia el bienestar.</p>
                <p className="mt-5">Somos un equipo multidisciplinario que valora la innovación, la adaptabilidad y el respeto mutuo. Nos guiamos por principios ágiles, asegurando que nuestro trabajo no solo cumpla con altos estándares de calidad, sino que también evolucione constantemente para satisfacer las necesidades cambiantes de nuestros usuarios.</p>
                <p className="mt-5 color-purple text-center font-bold bg-purple-100 p-2 rounded-lg">En Vitalit, tu bienestar es nuestra prioridad, y estamos aquí para acompañarte en cada paso de tu camino hacia una vida más saludable y equilibrada.</p>
                <h2 className="text-4xl mt-16">Nuestro Equipo</h2>
                <div className="flex flex-col lg:flex-row w-full gap-10">
                    <div className="w-full lg:w-1/3 mt-10 border border-gray-400 rounded-xl p-10 text-center">
                        <img src="assets/images/team-1.png" alt="" className="w-[70%] h-auto rounded-lg m-auto" />
                        <h3 className="text-xl mt-5">Tomás Parra Monroy</h3>
                        <p className="text-sm">Desarrollador Frontend</p>
                    </div>
                    <div className="w-full lg:w-1/3 mt-10 border border-gray-400 rounded-xl p-10 text-center">
                        <img src="assets/images/team-3.jpg" alt="" className="w-[70%] h-auto rounded-full m-auto bg-gray-200" />
                        <h3 className="text-xl mt-5">Juan José Ramirez Gomez</h3>
                        <p className="text-sm">Desarrollador Backend</p>
                    </div>
                    <div className="w-full lg:w-1/3 mt-10 border border-gray-400 rounded-xl p-10 text-center">
                        <img src="assets/images/team-2.png" alt="" className="w-[70%] h-auto rounded-full m-auto bg-gray-200" />
                        <h3 className="text-xl mt-5">Juan Sebastian Medina Pinto</h3>
                        <p className="text-sm">Desarrollador Backend</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhoWeAre