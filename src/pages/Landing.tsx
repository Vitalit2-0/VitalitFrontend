import Header from "../components/Header"
import DefaultButton from "../components/helpers/DefaultButton"
import React from "react";
import Login from "./Login";
import GradientButton from "../components/helpers/GradientButton";
import Dot from "../components/stylers/Dot";
import Ring from "../components/stylers/Ring";
import FeatureCard from "../components/FeatureCard";
import FadeRightComponent from "../components/animators/FadeRightComponent";
import FadeLeftComponent from "../components/animators/FadeLeftComponent";
import Footer from "../components/Footer";

function Landing() {
    const [transition, setTransition] = React.useState("") 

    return (
        <div className="relative w-full h-screen">
            <Login transition={transition}/>
            <div className="h-screen relative">
                <Header setTransition={() => setTransition("animate")}/>
                <section id="#inicio" className="flex pr-20 pl-20 relative z-10">
                    <div className="w-1/2 h-screen relative flex justify-center content-center flex-col mt-18">
                        <img className="w-32 absolute bottom-20 right-10 animate-rotate-x" src="../assets/images/shape-1.png" alt="" />
                        <h1 className="text-6xl mb-10">Bienvenido a Vitalit </h1>
                        <p className="text-xl leading-10 mb-10">Transforma tu bienestar. Únete a Vitalit y empieza tu camino hacia una vida saludable. Descubre el universo de salud física y mental a tu medida.</p>
                        <DefaultButton id="#vitalit" text="Comenzar" className="base-pink w-1/2"/>
                    </div>
                    <div className="w-1/2 relative flex flex-wrap justify-center content-center mt-28">
                        <img src="../assets/images/famale-trainer.png" alt="" className="w-1/2 h-auto" />
                        <div className="absolute w-56 top-20 left-8 text-center p-5 rounded-md font-bold animate-top-bottom" style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>¡Tu meta está más cerca de lo que crees!</div>
                        <div className="absolute w-56 bottom-40 right-5 p-5 text-center rounded-md font-bold animate-top-bottom " style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>¡Tú pones límites!</div>
                    </div>
                </section>
                <section id="vitalit" className="h-screen relative bg-white">
                    <div className="flex relative z-20 h-full">
                        <div className="w-full rounded-3xl m-20 relative" style={{background: "#faf9ff"}}>
                            <Dot width="32px" color="rgba(53, 197, 250, 0.5)" bottom="10%" right="5%"/>
                            <Dot width="72px" color="rgba(253, 120, 159, 0.8)" top="-7%" left="-3%"/>
                            <Dot width="64px" color="rgba(255, 152, 51, 0.5)" bottom="11%" right="8%"/>
                            <Ring width="256px" color="rgba(53, 197, 250, 0.5)" top="-30%" right="-4%"/>
                            <Ring width="320px" color="rgba(53, 197, 250, 0.5)" bottom="-35%" left="-14%" strokewidth="10"/>
                            <div className="flex p-20">
                                <div className="w-1/2 pr-20 color-black">
                                    <h2 className="text-2xl color-purple mt-5">¿Qué es Vitalit?</h2>
                                    <p className="mt-12 text-justify leading-8 mb-10">Nuestro propósito es apoyar a cada persona en su viaje hacia el bienestar, entregando herramientas y soporte en el desarrollo de una vida más saludable y plena. Queremos transformar el cuidado personal, convirtiéndonos en el aliado de nuestros usuarios en su búsqueda de salud y felicidad.</p>
                                    <div className="flex">
                                        <GradientButton text="Iniciar Sesión" onClick={() => setTransition("animate")} className='base-gradient'/>
                                        <div style={{width: "10px"}}></div>
                                        <DefaultButton id="#mission-vision" text="Misión y Visión" className="base-pink w-1/2 ml-10"/>                                </div>
                                    </div>
                                <div className="w-1/2 overflow-hidden">
                                    <FeatureCard text="Salud Mental" paragraph="El camino hacia una mente más sana y feliz." emoji="🧠" />
                                    <FeatureCard text="Salud Física" paragraph="El camino hacia un cuerpo más fuerte y saludable." emoji="🏋️‍♂️" />
                                    <FeatureCard text="Nutrición" paragraph="Una alimentación saludable y equilibrada" emoji="🥦" />
                                    <FeatureCard text="Bienestar Emocional" paragraph="El equilibrio para tu paz interior y emociones." emoji="❤️" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="mission-vision" className="h-screen relative w-full bg-white">
                    <div className="p-20 h-full">
                        <div className="bg-image-purple overflow-hidden w-full h-full flex pl-48 pr-48 pt-20 pb-20" style={{borderRadius: "10px", borderTopLeftRadius: "200px", borderBottomRightRadius: "200px"}}>
                            <FadeLeftComponent className="w-1/2">
                                <div className="base-white p-10 rounded-3xl shadow-card text-center mr-5">
                                    <img className="w-1/4 m-auto" src="../assets/images/vision.png" alt="" />
                                    <h3 className="text-2xl color-purple font-bold mt-5 mb-5">Visión</h3>
                                    <p className="leading-8">Para el año 2027, <span className="font-bold">Vitalit</span> busca ser el referente por excelencia en la promoción del cuidado personal, físico y mental, mediante un enfoque en la innovación continua, el apoyo mutuo y una experiencia enriquecedora.</p>
                                </div>
                            </FadeLeftComponent>
                            <FadeRightComponent className="w-1/2">
                                <div className="base-white p-10 rounded-3xl shadow-card text-center ml-5">
                                    <img className="w-1/4 m-auto" src="../assets/images/mision.png" alt="" />
                                    <h3 className="text-2xl color-purple font-bold mt-5 mb-5">Misión</h3>
                                    <p className="leading-8">Para el año 2027, <span className="font-bold">Vitalit</span> busca ser el referente por excelencia en la promoción del cuidado personal, físico y mental, mediante un enfoque en la innovación continua, el apoyo mutuo y una experiencia enriquecedora.</p>
                                </div>
                            </FadeRightComponent>
                        </div>
                    </div>
                </section>
                <section id="unete" className="h-screen relative bg-white overflow-hidden">
                    <Ring width="320px" color="rgba(53, 197, 250, 0.5)" bottom="-15%" right="-8%" strokewidth="10"/>
                    <Dot width="72px" color="rgba(253, 120, 159, 0.8)" top="7%" left="3%"/>
                    <img className="w-32 absolute top-20 right-40 animate-rotate-x" src="../assets/images/shape-1.png" alt="" />
                    <div className="h-full p-20">
                        <div className="flex h-full rounded-3xl" style={{background: "#faf9ff"}}>
                            <div className="w-1/3 h-full flex content-center flex-wrap">
                                <img src="../assets/images/runner.png" alt="" className="w-full h-auto" />
                            </div>
                            <div className="w-2/3 p-20 flex flex-col justify-center">
                                <h3 className="text-6xl font-bold color-purple">Únete a Vitalit</h3>
                                <p className="mt-5 mb-5 text-4xl" style={{lineHeight: "60px"}}>Transforma tu bienestar con cada paso hacia un futuro más saludable y feliz.</p>
                                <div className="flex">
                                    <GradientButton text="Empieza ahora!" onClick={() => setTransition("animate")} className='base-gradient'/>
                                    <DefaultButton id="#our-team" text="Nuestro Équipo" className="base-pink w-1/2 ml-5"/>  
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer setTransition={() => setTransition("animate")}/>
            </div>
        </div>
    )
}

export default Landing