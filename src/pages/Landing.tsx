import Header from "../components/Header"
import DefaultButton from "../components/helpers/DefaultButton"
import React from "react";
import Login from "./Login";
import GradientButton from "../components/helpers/GradientButton";

function Landing() {
    const [transition, setTransition] = React.useState("") // [1

    return (
        <div className="relative w-full h-screen">
            <Login transition={transition}/>
            <div className="h-screen relative">
                <Header setTransition={() => setTransition("animate")}/>
                <section id="#inicio" className="flex pr-20 pl-20 relative z-10">
                    <div className="w-1/2 h-screen relative flex justify-center content-center flex-col mt-18">
                        <img className="w-32 absolute bottom-20 right-10 animate-rotate-x" src="../assets/images/shape-1.png" alt="" />
                        <h1 className="text-6xl mb-10">Bienvenido a Vitalit </h1>
                        <p className="text-xl leading-10 mb-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus debitis amet reprehenderit aliquid impedit adipisci tempora modi quis obcaecati voluptatibus?</p>
                        <DefaultButton id="#vitalit" text="Comenzar" className="base-pink w-1/2"/>
                    </div>
                    <div className="w-1/2 relative flex flex-wrap justify-center content-center mt-28">
                        <img src="../assets/images/famale-trainer.png" alt="" className="w-1/2 h-auto" />
                        <div className="absolute top-20 left-10 p-5 rounded-md font-bold animate-top-bottom" style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>Frase motivadora 1</div>
                        <div className="absolute bottom-40 right-10 p-5 rounded-md font-bold animate-top-bottom " style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>Frase motivadora 2</div>
                    </div>
                </section>
                <section id="vitalit" className="h-screen relative bg-white">
                    <div className="flex relative z-20 h-full">
                        <div className="w-full rounded-3xl m-20" style={{background: "#faf9ff"}}>
                            <div className="flex p-20">
                                <div className="w-1/2 pr-20 color-black">
                                    <h2 className="text-2xl color-purple mt-5">¿Qué es Vitalit?</h2>
                                    <p className="mt-12 text-justify leading-8 mb-10">Nuestro propósito es apoyar a cada persona en su viaje hacia el bienestar, entregando herramientas y soporte en el desarrollo de una vida más saludable y plena. Queremos transformar el cuidado personal, convirtiéndonos en el aliado de nuestros usuarios en su búsqueda de salud y felicidad.</p>
                                    <div className="flex">
                                        <GradientButton text="Iniciar Sesión" onClick={() => setTransition("animate")} className='base-gradient'/>
                                        <div style={{width: "10px"}}></div>
                                        <DefaultButton id="#" text="Misión y Visión" className="base-pink w-1/2 ml-10"/>                                </div>
                                    </div>
                                <div className="w-1/2">
                                    <div className="flex content-center flex-wrap p-5">
                                        <div>
                                            <div className="features-circular purple-transparent">
                                                <span role="img" aria-label="brain">🧠</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center ml-10">
                                            <h3 className="font-bold">Salud Mental</h3>
                                            <p>El camino hacia una mente más sana y feliz.</p>
                                        </div>
                                    </div>
                                    <div className="flex content-center flex-wrap p-5">
                                        <div>
                                            <div className="features-circular purple-transparent">
                                                <span role="img" aria-label="weights">🏋️‍♂️</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center ml-10">
                                            <h3 className="font-bold">Salud Física</h3>
                                            <p>El camino hacia un cuerpo más fuerte y saludable.</p>
                                        </div>
                                    </div>
                                    <div className="flex content-center flex-wrap p-5">
                                        <div>
                                            <div className="features-circular purple-transparent">
                                                <span role="img" aria-label="nutrition">🥦</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center ml-10">
                                            <h3 className="font-bold">Nutrición</h3>
                                            <p>Una alimentación saludable y equilibrada.</p>
                                        </div>
                                    </div>
                                    <div className="flex content-center flex-wrap p-5">
                                        <div>
                                            <div className="features-circular purple-transparent">
                                                <span role="img" aria-label="heart">❤️</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center ml-10">
                                            <h3 className="font-bold">Bienestar Emocional</h3>
                                            <p>El equilibrio para tu paz interior y emociones.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Landing