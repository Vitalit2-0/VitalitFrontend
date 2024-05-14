import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProgressBar from '../../shared/ProgressBar';
import WorkoutLoader from './WorkoutLoader';
import { useModal } from '../../shared/PopupAlert';
import StatusBar from './StatusBar';
import { stages } from '../../../constants/workout';
import ExerciseContainer from './ExerciseContainer';

function WorkoutPlan({workoutPlan, stage, setStage}: any) {

    const [currentExercise, setCurrentExercise] = React.useState<any>(null);
    const [percentage, setPercentage] = useState(0);
    const [resting, setResting] = useState({isResting: false, seconds: 0});
    const { showNotification } = useModal();

    useEffect(() => {
        if(stage === stages.workoutStarted)
        {
            setTimeout(() => {
                setCurrentExercise({...workoutPlan[0], completedSeries: 0, index: 0});
            }, 4500);
        }

    }, [workoutPlan, stage])

    function previousExercise() {
        if(resting.isResting)
        {
            showNotification("¡Espera a que termine tu descanso para iniciar otro ejercicio!", "error");
            return;
        }

        if(currentExercise.completedSeries >= (currentExercise.sets)) return;
        if(currentExercise.completedSeries === 0 && currentExercise.index === 0) return;

        if(currentExercise.completedSeries === 0)
        {
            setCurrentExercise({...(workoutPlan[currentExercise.index - 1]), completedSeries: 0, index: currentExercise.index - 1});
            return;
        } 

        setCurrentExercise({...currentExercise, completedSeries: currentExercise.completedSeries - 1});
        
    }

    function nextExercise(seconds: number) {
        if(resting.isResting)
        {
            showNotification("¡Espera a que termine tu descanso para iniciar el siguiente ejercicio!", "error");
            return;
        } 
        if(currentExercise.completedSeries === currentExercise.sets && currentExercise.index === workoutPlan.length - 1) return;

        if(currentExercise.completedSeries === (currentExercise.sets-1))
        {
            setCurrentExercise({...currentExercise, completedSeries: currentExercise.completedSeries + 1});
            StartRestTime(currentExercise.type === "entrenamiento" ? seconds*3 : (currentExercise.type === "estiramiento" ? 0 : seconds), true);
            return;
        }

        StartRestTime(seconds, false);
        setCurrentExercise({...currentExercise, completedSeries: currentExercise.completedSeries + 1});
    }

    function StartRestTime(seconds: number, nextExercise = false)
    {
        setResting({isResting: true, seconds: seconds});
        const intervalTime = (seconds * 10);
            
        const interval = setInterval(() => {
            setResting(prev => ({...prev, seconds: prev.seconds - 1}));
            setPercentage(prev => prev + (100/seconds));
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            setPercentage(0);
            setResting({isResting: false, seconds: 0});
            
            if(workoutPlan[currentExercise.index + 1] && nextExercise)
            {
                setCurrentExercise({...(workoutPlan[currentExercise.index + 1]), completedSeries: 0, index: currentExercise.index + 1});
                return;
            }
            
            if(workoutPlan[currentExercise.index + 1] || currentExercise.completedSeries < (currentExercise.sets - 1)) return;
            
            localStorage.setItem("workoutComplete", "true");
            setStage(stages.workoutFinished);
        }, intervalTime * 100);
    }

    return (
        <div className='w-full h-full flex flex-col justify-start bg-white rounded-3xl shadow-md'>
            <StatusBar title={resting.isResting ? "Descansa" : "¡Comienza!"} seconds={resting.seconds} />
            <ProgressBar percentage={percentage}/>
            <div className='px-5 flex flex-col sm:flex-row items-center gap-5 justify-start my-5'>
                <div className='p-2 bg-purple-200 color-purple rounded-lg'>{currentExercise.type}</div>
                <h2 className="font-bold text-xl text-left">Inicia con {currentExercise.repetitions} {currentExercise.exerciseName}</h2>
            </div>
            {currentExercise ?
                <div className='flex w-full p-5 pb-2'>
                    <div className='w-16 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-200' onClick={previousExercise} >
                        <IoIosArrowBack className='text-black text-2xl cursor-pointer'/>
                    </div>
                    <div className='w-10/12 p-3 py-0'>
                        <div className='relative flex flex-col gap-5 xl:flex-row mt-5'>
                            <div className="xl:w-72 flex flex-col items-center">
                                <ExerciseContainer exerciseId={currentExercise.exerciseId} />
                            </div>
                            <div className='w-full flex flex-col '>
                                <div>
                                    <div className='flex justify-between pt-2 pb-2'>
                                        <p className='color-purple'>Equipo:</p>
                                        <p>{currentExercise.equipment}</p>
                                    </div>
                                    <hr />
                                    <div className='flex justify-between pt-2 pb-2'>
                                        <p className='color-purple'>Descanso:</p>
                                        <p>{currentExercise.rest} segundos</p>
                                    </div>
                                    <hr />
                                    <div className='mt-4'>
                                        <div className='flex'>
                                            <h3 className='font-bold mb-5 mr-2'>Series completadas:</h3>
                                            <span>{`${currentExercise.completedSeries}/${currentExercise.sets}`}</span>
                                        </div>
                                        <div className="flex">
                                            <ProgressBar percentage={(currentExercise.completedSeries/currentExercise.sets)*100}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-16 flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-200' onClick={() => nextExercise(Number(currentExercise.rest))} >
                        <IoIosArrowForward className='text-black text-2xl cursor-pointer'/>
                    </div>
                </div>
            : 
                <div>
                    {!currentExercise && <WorkoutLoader workoutStarted={stage === stages.workoutStarted}/>}
                </div>
            }
            <div className='lg:mt-10'>
                {Array.from(workoutPlan)
                    .filter((w: any) => workoutPlan.indexOf(w) == currentExercise?.index + 1)
                    .map((workout: any, index: number) => {
                        return (
                            <div key={index} className='bg-purple-200 w-full flex flex-col xl:flex-row justify-between items-center py-5 px-10 rounded-xl color-purple'>
                                <p className='mb-10 xl:mb-0 font-bold'>Siguiente ejercicio</p>
                                <div className='flex items-center gap-5'>
                                    <p>{workout.exerciseName}</p>
                                    <ExerciseContainer exerciseId={workout.exerciseId} next={true} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            
        </div>
    )
}

export default WorkoutPlan