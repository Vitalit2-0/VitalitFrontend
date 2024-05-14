import { TextareaAutosize } from "@mui/material"
import MultipleChoiceButton from "../components/helpers/MultipleChoiceButton"
import { useState } from "react";
import GradientButton from "../components/helpers/GradientButton";
import SliderHelper from "../components/shared/SliderHelper";
import { videos } from "../constants/nutrition";
import { CreateRecipe } from "../services/OpenAIService";
import { getSurveyResults } from "../services/SurveyDataProvider";
import useAuthStore from "../stores/AuthStore";
import { useModal } from "../components/shared/PopupAlert";

function Nutrition() {

    const [recomendations, setRecomendations] = useState("");
    const [food, setFood] = useState("");
    const [recipe, setRecipe] = useState<any>(null);

    const user = useAuthStore((state:any) => state.user);
    const { showFullScreenLoader } = useModal();

    const handleFoodChange = (option: string) => {
        console.log(option);
        setFood(option);
    }

    function handleRecomendations(e: any) {
        setRecomendations(e.target.value);
    }

    async function handleCreateRecipe(){
        showFullScreenLoader(true, "Regálanos un momento. Estamos creando una receta deliciosa para ti.");
        const survey: any = await getSurveyResults(user.id, user.token);

        const recipe = await CreateRecipe(survey.data ? survey.data : null, food, recomendations);   
        setRecipe(recipe.data);
        showFullScreenLoader(false, "");
    }   

    return (
        <div className="flex flex-col gap-2 justify-center items-center base-gray md:p-10 md:pl-28">
            <div className={`w-full`}>
                <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-3xl shadow-md md:sticky top-10 p-5">
                        <p className="color-purple font-bold text-center bg-purple-200 p-3 rounded-xl">La nutrición es la base del bienestar. Cada bocado es una oportunidad para nutrir tu cuerpo y fortalecer tu salud.</p>
                        <h1 className="font-bold text-2xl mb-8 text-left color-dark-cyan mt-10">Voy a preparar:</h1>
                        <MultipleChoiceButton options={["Desayuno", "Almuerzo", "Cena"]} onChange={handleFoodChange} />
                        <h3 className="mb-8 text-left color-dark-cyan mt-10"><span className="color-purple">¿Alguna recomendación especifica antes de crear tu receta?</span> Ten en cuenta que tus respuestas a la encuesta serán tenidas en cuenta</h3>
                        <TextareaAutosize onChange={handleRecomendations} className="w-full p-3 rounded-xl mb-5" placeholder="Escribe aquí tus recomendaciones" />
                        <GradientButton className="w-full base-gradient" text="Crear Receta" onClick={() => handleCreateRecipe()} />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/3 px-10 bg-white rounded-3xl shadow-md p-5">
                        {recipe &&
                            <div>
                                <h1 className="font-bold text-2xl mb-10 text-left color-dark-cyan">Aquí tienes tu receta</h1>
                                <div className="w-full">
                                    <div className="flex flex-col lg:flex-row items-start gap-10">
                                        <div className="lg:w-1/2">
                                            <h1 className="text-xl color-purple mb-3">{recipe.title}</h1>
                                            <p>{recipe.description}</p>
                                            <h1 className="text-xl color-purple mt-5 mb-3">Ingredientes</h1>
                                            <ul>
                                                {recipe.ingredients.map((ingredient: any, i: number) => {
                                                    return (
                                                        <div>
                                                            <div className="py-2">
                                                                <li key={i}>{ingredient.quantity} de {ingredient.name}</li>
                                                            </div>
                                                            <hr />
                                                        </div>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="w-full lg:w-1/2">
                                            <div className="flex flex-col items-center border border-purple-300 p-5 rounded-lg">
                                                <div className="w-full flex justify-between mb-3 mt-4">
                                                    <p className="color-purple">Tiempo de preparación:</p>
                                                    <p>{recipe.prep_time}</p>
                                                </div>
                                                <div className="w-full flex justify-between mb-3">
                                                    <p className="color-purple">Tiempo de cocción:</p>
                                                    <p>{recipe.cook_time}</p>
                                                </div>
                                                <div className="w-full flex justify-between mb-3">
                                                    <p className="color-purple">Tiempo total:</p>
                                                    <p>{recipe.total_time}</p>
                                                </div>
                                            </div>
                                            <table className="w-full mt-5">
                                                <thead>
                                                    <tr>
                                                        <th className="color-purple text-left border border-purple-300 bg-purple-200 p-2">Nombre</th>
                                                        <th className="color-purple text-left border border-purple-300 bg-purple-200 p-2">Valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(recipe.nutrition_facts).map(([k,v]:any, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className="border border-purple-300 p-2">{k}</td>
                                                                <td className="border border-purple-300 p-2">{v}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-5 mb-10 bg-gray-100 rounded-3xl shadow-md p-5">
                                    <h1 className="text-xl color-purple mb-3">Preparación</h1>
                                    <ol>
                                        {recipe.instructions.map((instruction: any, i: number) => {
                                            return (
                                                <li key={i} className="my-2"><span className="font-bold">{i+1}.</span> {instruction.description}</li>
                                            )
                                        })}
                                    </ol>
                                    <div className="w-full p-2 bg-green-200 rounded-lg text-green-500 font-bold text-center">
                                        ¡Listo! Disfruta de tu deliciosa receta.
                                    </div>
                                </div>
                            </div>
                        }
                        <h1 className="font-bold text-2xl mb-8 text-left color-dark-cyan">Tambien podrían gustarte las siguientes recomendaciones</h1>
                        <p className="text-yellow-600 bg-yellow-200 w-36 p-2 rounded-lg my-5">Para Desayunar</p>
                        <SliderHelper items={videos.filter(x => x.type === "Para desayunar")} />
                        <p className="text-yellow-600 bg-yellow-200 w-36 p-2 rounded-lg my-5">Para Almorzar</p>
                        <SliderHelper items={videos.filter(x => x.type === "Para Almorzar")} />
                        <p className="text-yellow-600 bg-yellow-200 w-36 p-2 rounded-lg my-5">Para Cenar</p>
                        <SliderHelper items={videos.filter(x => x.type === "Para Cenar")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nutrition