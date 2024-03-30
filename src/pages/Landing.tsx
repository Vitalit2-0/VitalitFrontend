import Header from "../components/Header"
import DefaultButton from "../components/helpers/DefaultButton"
import React from "react";
import Login from "./Login";

function Landing() {
    const [transition, setTransition] = React.useState("") // [1

    return (
        <div className="relative w-full h-screen">
            <div className="h-screen relative">
                <div className="absolute w-screen h-screen"></div>
                <Header setTransition={() => setTransition("animate")}/>
                <div className="flex pr-20 pl-20 pt-10 relative z-10">
                    <div className="w-1/2 relative flex justify-center content-center flex-col mt-18">
                        <img className="w-32 absolute bottom-20 right-10 animate-rotate-x" src="../assets/images/shape-1.png" alt="" />
                        <h1 className="text-7xl mb-10">Bienvenido a Vitalit </h1>
                        <p className="text-xl leading-10 mb-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus debitis amet reprehenderit aliquid impedit adipisci tempora modi quis obcaecati voluptatibus?</p>
                        <DefaultButton text="Comenzar" className="base-pink w-1/2"/>
                    </div>
                    <div className="w-1/2 relative flex justify-center content-center mt-28">
                        <img src="../assets/images/famale-trainer.png" alt="" className="w-1/2" />
                        <div className="absolute top-20 left-10 p-5 rounded-md font-bold animate-top-bottom" style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>Frase motivadora 1</div>
                        <div className="absolute bottom-40 right-10 p-5 rounded-md font-bold animate-top-bottom " style={{background: "rgba(255, 255, 255, 0.6)", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>Frase motivadora 2</div>
                    </div>
                </div>
            </div>
            <Login transition={transition}/>
        </div>
    )
}

export default Landing