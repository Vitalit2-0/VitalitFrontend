import CircularTimer from '../../shared/CircularTimer';
import { IoCloseCircle } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';
import { meditationVideo, stages } from '../../../constants/mentalHealth';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { MdFullscreen } from "react-icons/md";
import GradientButton from '../../helpers/GradientButton';
import { useEffect, useState } from 'react';
import VideoFile from './VideoFile';
import AudioFile from './AudioFile';
import { toast } from 'react-toastify';
import { RegisterActivity } from '../../../services/ActivitiesServiceProvider';
import useAuthStore from '../../../stores/AuthStore';

function CurrentActivity({ activity, handleFinishActivity, setStage }: { activity:any, handleFinishActivity:any, setStage:any }) {

    const [currentPose, setCurrentPose] = useState(0);
    const [currentInstruction, setCurrentInstruction] = useState(0);
    const handle = useFullScreenHandle();
    const user = useAuthStore((state:any) => state.user);

    useEffect(() => {
        console.log(activity);
        setCurrentPose(0);
        setCurrentInstruction(0);
    }, [activity]);

    useEffect(() => {
        if(activity.id === 1)
        {
            const interval = setInterval(() => {
                if (currentInstruction < activity.instructions.length - 1) 
                {
                    console.log(currentInstruction);
                    console.log(activity.instructions);
                    setCurrentInstruction(currentInstruction + 1);
                    const audio = new Audio('assets/audios/instruction-change.mp3');
                    audio.play();
                } 
                else
                {
                    clearInterval(interval);
                    setStage(stages.activityFinished);
                    registerActivityFinished("Has completado tu meditación guiada");
                }
            }, 120000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [currentInstruction]);

    const handleFullScreen = () => {
        if (handle.active) {
            handle.exit();
        } else {
            handle.enter();
        }
    }

    const handleNextYogaPose = () => {
        if(currentPose < activity.yogaPoses.length - 1)
        {
            setCurrentPose(currentPose + 1);
        }
        else
        {
            setStage(stages.activityFinished);
            registerActivityFinished("Tu rutina de yoga completada");
        }
    }

    const registerActivityFinished = (message:string) => {
        const register: ActivityDto = {
            activity_type: "activity",
            activity_date: new Date().toLocaleDateString('en-GB'),
            activity_hour: new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}),
            activity_detail: `${message}. ¡Felicidades!`
        }

        toast.success(`${message}. ¡Felicidades! 🎉`)
        
        RegisterActivity(user.token, register);
    }

    return (
        <FullScreen handle={handle} className='h-full'>
        <div className='w-full min-h-screen relative bg-cover bg-center' style={activity.id === 2 ? {backgroundImage: `url("${activity.image}")`} : {}}>
                {activity.id === 1 && 
                    <div className='h-full min-h-screen'>
                        <div className='w-full h-full'>
                            <VideoFile src={meditationVideo.video} />
                        </div>
                        <div className={`${handle.active ? "absolute pb-20 bg-gradient-to-b from-transparent to-gray-300" : "py-10 h-full"} flex flex-col justify-end  px-10 left-0 right-0 bottom-0 h-full `} >
                            <h1 className='text-4xl'>Instrucción {currentInstruction + 1}</h1>
                            <h1 className='text-justify text-xl color-black'>{activity?.instructions[currentInstruction]}</h1>
                        </div>
                    </div>
                }
                {activity.id === 2 && 
                    <div className='absolute left-0 right-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent to-gray-300' />
                }
                <div className='absolute top-10 right-16 z-10'>
                    <a className="w-12 mb-5 ms-5" onClick={() => handleFinishActivity(stages.choosingActivity)} data-tooltip-id="start-tooltip" data-tooltip-variant="success" data-tooltip-content={"Terminar actividad"}>
                        <IoCloseCircle className='text-4xl color-purple cursor-pointer' />
                    </a>
                    <Tooltip id="start-tooltip" place={"right"} />
                </div>
                {activity.id === 0 &&
                    <div className='h-full relative'>
                        <div className={`relative ${handle.active ? "h-screen" : "h-full"} flex justify-between gap-10`}>
                            <div className='flex flex-col lg:flex-row justify-between items-start sm:p-5 md:p-10 lg:p-20 bg-white rounded-lg gap-10'>
                                <div className='lg:w-1/2 h-full relative '>
                                    <VideoFile src={activity.yogaPoses[currentPose].video} />
                                    <div className='px-5 py-2'>
                                        <GradientButton text="Siguiente" className="w-full base-gradient" onClick={() => handleNextYogaPose()}/>
                                    </div>
                                </div>
                                <div className='lg:w-1/2 flex flex-col gap-5 px-10 pb-20 sm:px-0'>
                                    <h1 className='text-justify text-2xl color-purple font-bold color-black'>{activity.yogaPoses[currentPose].title}</h1>
                                    <p className='text-justify color-black'>{activity.yogaPoses[currentPose].description}</p>
                                    <p><span className='font-bold color-purple'>Si te incomoda algo:</span> {activity.yogaPoses[currentPose].modify}</p>
                                    <p><span className='font-bold color-purple'>Enfocate en el presente:</span> {activity.yogaPoses[currentPose].beMindful}</p>
                                    <div className='flex flex-col gap-5'>
                                    {
                                        activity.yogaPoses[currentPose].steps.map((step:any, index:number) => {
                                            return (
                                                <p><span className='color-purple font-bold'>{index+1}.</span> {step}</p>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {activity.id === 2 &&  
                    <div className='h-screen relative'>
                        <div className='relative h-full flex justify-between items-end gap-10'>
                            <div className='flex flex-col-reverse lg:flex-row justify-end gap-10 p-5 sm:p-10 md:p-20'>
                                <h1 className='text-justify text-xl color-black'>{activity?.instruction}</h1>
                                <div className='w-full flex lg:justify-center items-start'>
                                    <div className='border border-black w-72 pl-8 pb-2 rounded-lg'>
                                        <div className='flex justify-end items-center '>
                                            <p className='color-black'>Ponte cómodo y relajate durante la actividad</p>
                                            <CircularTimer  />
                                        </div>
                                        <div className='pr-8'>
                                            <AudioFile />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className='absolute bottom-10 right-20 z-10'>
                    <a className="w-12 mb-5 ms-5" onClick={() => handleFullScreen()} data-tooltip-id="start-tooltip" data-tooltip-variant="success" data-tooltip-content={"Pantalla Completa"}>
                        <MdFullscreen className='text-4xl color-black cursor-pointer' />
                    </a>
                    <Tooltip id="start-tooltip" place={"right"} />
                </div>
        </div>
        </FullScreen>
    )
}

export default CurrentActivity