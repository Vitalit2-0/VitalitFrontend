import React from "react"
import NextButtonHelper from "../components/helpers/NextButtonHelper"
import ProgressBar from "../components/shared/ProgressBar"
import Question from "../components/pages/survey/Question"

function Survey() {

    const [flip, setFlip] = React.useState(false);
    const [percentage, setPercentage] = React.useState(0);

    async function getQuestions()
    {
        setFlip(!flip);
    }

    return (
        <div className="base-gradient w-screen h-screen flex flex-wrap items-center justify-center">
            <div className={`relative container-card max-w-[540px] ${(flip) ? "container-flipped" : ""}`}>
                <div className="card-inner h-full shadow-card">
                    <div className="card-front h-full inline-flex">
                        <picture className="absolute top-8 right-5 w-48 z-0">
                            <img src="assets/images/trainer-half.png" alt="entrenador"/>
                        </picture>
                        <div className="relative inline-flex flex-col z-10">
                            <div>
                                <p className="text-4xl mt-10">¡Hola!</p>
                                <p className="mt-14 pt-8 bg-text-card">Bienvenido a <span className="highlight-text">Vitalit</span>. Queremos personalizar tu experiencia al máximo y ayudarte a alcanzar tus metas. Esta rápida encuesta es el primer paso para crear tu plan de salud personalizado.</p>
                            </div>
                            <div className="flex justify-end  mt-10"> 
                                <NextButtonHelper text="Comenzar" onclick={getQuestions}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-back h-full absolute top-0 left-0 right-0 z-20">
                        <div className="p-2">
                            <ProgressBar percentage={percentage}/>
                        </div>
                        <div className="pr-10 pl-10 pt-6 h-full">
                            <Question flag={flip} setPercentage={setPercentage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Survey