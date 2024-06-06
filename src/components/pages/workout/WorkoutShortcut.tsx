import { stages } from '../../../constants/workout'
import { FaStopCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import { FaCirclePlay } from "react-icons/fa6";
import NavigationManager from '../../../services/NavigationManager';

function WorkoutShortcut({startWorkout, stage}: {startWorkout?: Function, stage?: number}) {
    
    function handleStartWorkout() {
        if(startWorkout){
            startWorkout(stage === stages.workoutStarted ? false : true);
            return;
        } 

        NavigationManager.navigateTo("/workout");
    }
    
    return (
        <div>
            <p className="color-purple font-bold text-center bg-purple-200 p-3 rounded-xl">Recuerda que la constancia es la clave para lograr tus objetivos.</p>
            <div className="mt-3 relative overflow-hidden rounded-xl">
                <img className="w-full rounded-xl" src="assets/images/workout.webp" alt="" />
                <div className="w-full h-full flex flex-col justify-between rounded-xl absolute top-0 right-0 left-0 bg-[rgba(0,0,0,0.4)]">
                    <h2 className="font-bold text-white text-xl mt-5 ms-5">Entrenamiento de hoy</h2>
                    <a className="w-12 mb-5 ms-5" onClick={handleStartWorkout} data-tooltip-id="start-tooltip" data-tooltip-variant="success" data-tooltip-content={stage === stages.workoutStarted ? "Terminar" : "Empecemos!"}>
                        {stage !== stages.workoutStarted ? <FaCirclePlay className="text-white text-5xl cursor-pointer" /> :
                        <FaStopCircle className="text-white text-5xl cursor-pointer" />}
                    </a>
                    <Tooltip id="start-tooltip" place={"right"} />
                </div>
            </div>
        </div>
    )
}

export default WorkoutShortcut