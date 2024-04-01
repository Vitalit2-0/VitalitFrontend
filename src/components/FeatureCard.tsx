import FadeRightComponent from "./animators/FadeRightComponent";

function FeatureCard({ emoji, text, paragraph } : { emoji: string, text: string, paragraph: string }) {
    
    return (
        <FadeRightComponent>
            <div className={`flex content-center feature-card flex-wrap p-5`} >
                <div>
                    <div className="features-circular purple-transparent">
                        <span role="img" aria-label="brain">{emoji}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center ml-10">
                    <h3 className="font-bold">{text}</h3>
                    <p>{paragraph}</p>
                </div>
            </div>
        </FadeRightComponent>
    )
}

export default FeatureCard