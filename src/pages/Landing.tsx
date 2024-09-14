import DefaultButton from "../components/helpers/DefaultButton"
import GradientButton from "../components/helpers/GradientButton";
import Dot from "../components/stylers/Dot";
import Ring from "../components/stylers/Ring";
import FeatureCard from "../components/shared/FeatureCard";
import FadeRightComponent from "../components/animators/FadeRightComponent";
import FadeLeftComponent from "../components/animators/FadeLeftComponent";
import NavigationManager from "../services/NavigationManager";
import { FaArrowUp } from "react-icons/fa";

function Landing({ setTransition } : { setTransition: any }) {
    return (
        <div>
            <section id="inicio" className="w-full">
                <div className="flex flex-col lg:flex-row relative z-10 max-w-[1920px] mx-auto">   
                    <div className="w-full px-10 md:px-20 mt-10 lg:w-1/2 min-h-[640px] h-screen relative z-20 base-linear-white-gradient flex justify-center content-center flex-col mt-18">
                        <img className="hidden w-32 absolute md:inline bottom-96 lg:bottom-20 right-10 animate-rotate-x" src="assets/images/shape-1.png" alt="" />
                        <h1 className="text-5xl lg:text-6xl mb-10">Bienvenido a Vitalit </h1>
                        <p className="text-xl leading-10 mb-10">Transforma tu bienestar. Únete a Vitalit y empieza tu camino hacia una vida saludable. Descubre el universo de salud física y mental a tu medida.</p>
                        <DefaultButton onclick={() => NavigationManager.scrollTo("vitalit")} text="Comenzar" className="base-pink w-full lg:w-1/2"/>
                    </div>
                    <div className="absolute w-2/3 right-0 top-20 lg:relative lg:w-1/2 flex flex-wrap justify-center content-center">
                        <img src="assets/images/famale-trainer.png" alt="" className="w-96 h-auto" />
                        <div className="hidden lg:inline absolute w-56 top-20 left-8 text-center p-5 rounded-md font-bold animate-top-bottom" style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>¡Tu meta está más cerca de lo que crees!</div>
                        <div className="hidden lg:inline absolute w-56 bottom-40 right-5 p-5 text-center rounded-md font-bold animate-top-bottom " style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>¡Tú pones límites!</div>
                    </div>
                </div>
            </section>
            <section id="vitalit" className="min-h-screen relative bg-white">
                <div className="flex relative z-20 h-full max-w-[1920px] mx-auto">
                    <div className="w-full rounded-3xl md:m-20 relative h-auto min-h-[580px]" style={{background: "#faf9ff"}}>
                        <Dot width="32px" color="rgba(53, 197, 250, 0.5)" bottom="10%" right="5%"/>
                        <Dot width="72px" color="rgba(253, 120, 159, 0.8)" top="-7%" left="-3%"/>
                        <Dot width="64px" color="rgba(255, 152, 51, 0.5)" bottom="11%" right="8%"/>
                        <Ring width="256px" color="rgba(53, 197, 250, 0.5)" top="-30%" right="-4%"/>
                        <Ring width="320px" color="rgba(53, 197, 250, 0.5)" bottom="-35%" left="-14%" strokewidth="10"/>
                        <div className="flex p-10 md:p-20 gap-20 lg:flex-row flex-col">
                            <div className="lg:w-1/2 color-black">
                                <h2 className="text-2xl color-purple mt-5">¿Qué es Vitalit?</h2>
                                <p className="mt-12 text-justify leading-8 mb-10">Nuestro propósito es apoyar a cada persona en su viaje hacia el bienestar, entregando herramientas y soporte en el desarrollo de una vida más saludable y plena. Queremos transformar el cuidado personal, convirtiéndonos en el aliado de nuestros usuarios en su búsqueda de salud y felicidad.</p>
                                <div className="flex flex-col md:flex-row gap-5">
                                    <GradientButton text="Iniciar Sesión" onClick={() => setTransition("animate")} className='base-gradient md:w-1/2'/>
                                    <DefaultButton onclick={() => NavigationManager.scrollTo("mission-vision")} text="Misión y Visión" className="base-pink md:w-1/2"/>                                </div>
                                </div>
                            <div className="lg:w-1/2 overflow-hidden mt-10 lg:mt-0">
                                <FeatureCard text="Salud Mental" paragraph="El camino hacia una mente más sana y feliz." emoji="🧠" />
                                <FeatureCard text="Salud Física" paragraph="El camino hacia un cuerpo más fuerte y saludable." emoji="🏋️‍♂️" />
                                <FeatureCard text="Nutrición" paragraph="Una alimentación saludable y equilibrada" emoji="🥦" />
                                <FeatureCard text="Bienestar Emocional" paragraph="El equilibrio para tu paz interior y emociones." emoji="❤️" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="mission-vision" className="min-h-screen relative w-full bg-white">
                <div className="md:px-20 py-8 h-full max-w-[1920px] mx-auto">
                    <div className="relative overflow-hidden w-full h-full px-10 md:px-20 xl:px-48 py-10 rounded-xl xl:rounded-tl-[200px] xl:rounded-br-[200px]">
                        <img src="assets/images/background.jpg" className="absolute top-0 left-0 w-full h-full" alt="" />
                        <div className="flex flex-col md:flex-row gap-10">
                            <FadeLeftComponent className="md:w-1/2 h-full">
                                <div className="base-white p-10 rounded-3xl shadow-card text-center">
                                    <img className="w-1/4 m-auto" src="assets/images/vision.png" alt="" />
                                    <h3 className="text-2xl color-purple font-bold mt-5 mb-5">Visión</h3>
                                    <p className="leading-8">Para 2027, nos convertiremos en el referente por excelencia en la promoción del cuidado personal, siendo reconocidos por ofrecer una plataforma integral que combine salud mental, física y nutricional a través de una experiencia única de personalización basada en inteligencia artificial que combina rutinas, recetas, prácticas de yoga y meditación junto con la supervisión de profesionales de la salud. </p>
                                </div>
                            </FadeLeftComponent>
                            <FadeRightComponent className="md:w-1/2 h-full">
                                <div className="base-white p-10 rounded-3xl shadow-card text-center">
                                    <img className="w-1/4 m-auto" src="assets/images/mision.png" alt="" />
                                    <h3 className="text-2xl color-purple font-bold mt-5 mb-5">Misión</h3>
                                    <p className="leading-8">Brindamos apoyo en la gestión del bienestar personal, ofreciendo a nuestros usuarios rutinas personalizadas de yoga, meditación, ejercicios de respiración, recetas e informes de progreso, todo en una plataforma integral y accesible. Permitiendo que cualquier persona, con solo un dispositivo y acceso a internet, pueda comenzar a mejorar su bienestar de manera sencilla y efectiva.</p>
                                </div>
                            </FadeRightComponent>
                        </div>
                        <div className="text-white relative flex justify-end mt-5">
                            <p onClick={() => NavigationManager.scrollTo("unete")} className='underline cursor-pointer'>Únete a Vitalit</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="unete" className="relative overflow-hidden min-h-screen max-w-[1920px] mx-auto bg-white ">
                <div className="relative">
                    <Ring width="320px" color="rgba(53, 197, 250, 0.5)" bottom="-15%" right="-8%" strokewidth="10"/>
                    <Dot width="72px" color="rgba(253, 120, 159, 0.8)" top="7%" left="3%"/>
                    <img className="hidden lg:inline w-32 absolute top-20 right-40 animate-rotate-x" src="assets/images/shape-1.png" alt="" />
                    <div className="h-full md:p-20 pt-20">
                        <div className="flex flex-col md:flex-row h-full content-center items-center rounded-3xl" style={{background: "#faf9ff"}}>
                            <div className="w-1/3 min-w-[330px] h-full flex">
                                <img src="assets/images/runner.png" alt="" className="w-full h-auto" />
                            </div>
                            <div className="md:w-2/3 p-10 md:p-20 flex flex-col justify-center">
                                <h3 className="text-6xl font-bold color-purple">Únete a Vitalit</h3>
                                <p className="mt-5 mb-5 text-xl">Transforma tu bienestar con cada paso hacia un futuro más saludable y feliz.</p>
                                <div className="flex flex-col lg:flex-row gap-5">
                                    <GradientButton text="Empieza ahora!" onClick={() => setTransition("animate")} className='base-gradient w-full lg:w-1/2'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => NavigationManager.scrollTo("inicio")} className="cursor-pointer rounded-full flex justify-center items-center w-16 h-16 absolute bottom-10 right-10 md:bottom-28 md:right-20 base-gradient">
                    <FaArrowUp className="text-white text-2xl" />
                </div>
            </section>
        </div> 
            
    )
}

export default Landing