import { Box, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import DefaultButton from '../helpers/DefaultButton';
import { toast, ToastContainer } from 'react-toastify';
import FullScreenLoader from './FullScreenLoader';
import { GetUserGoal, PlanGoal, RegisterGoal } from '../../services/GoalsServiceProvider';
import useAuthStore from '../../stores/AuthStore';
import PremiumBlock from './PremiumBlock';
import { CreateNotification } from '../../services/ActivitiesServiceProvider';

const ModalContext = createContext<any>(null)

export function useModal() {
    return useContext(ModalContext);
}

function PopupAlert() {

    const auth = useAuthStore((state: any) => state);
    const [addModal, setAddModal] = useState({ open: false, type: '' });
    const [goalsModal, setGoalsModal] = useState({ open: false, goals: null } as any);
    const [goalCount, setGoalCount] = useState(0); 
    const [selectedGoals, setSelectedGoals] = useState([] as any);
    const [description, setDescription] = useState('');
    const [modal, setModal] = useState({ open: false, title: '', description: '' });
    const [loadingData, setLoadingData] = useState({ loading: false, message: '' });
    const [resolver, setResolver] = useState<(value: boolean | PromiseLike<boolean>) => void>();
    const [addResolver, setAddResolver] = useState<(value: {confirm: boolean, description: string} | PromiseLike<{}>) => void>();
    const [goalsResolver, setGoalsResolver] = useState<(value: boolean | PromiseLike<boolean>) => void>();

    useEffect(() => {
        if(goalsModal.goals && goalsModal.goals.length === 0)
            verifyGoalsCreation();
        console.log(goalsModal.goals === null);
    }, [goalsModal.goals]);

    const verifyGoalsCreation = async() => {
        if(!goalsModal.goals) return;
        
        const response = await PlanGoal(auth.user, description);

        if(response.code !== "200" || !response.data)
        {
            toast.error("Error al añadir el objetivo, por favor intenta de nuevo");
            closeGoalsModal(false);
            return;
        }

        if(response.data.question)
        {
            toast.warning(response.data.question);
            closeGoalsModal(false);
            return;
        }
        
        setGoalsModal({ open: true, goals: response.data });
    }
    
    const openModal = (title: string, description: string) => {
        setModal({ open: true, title, description });
        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const closeModal = (confirm: boolean) => {
        if (resolver) {
            resolver(confirm);
            setResolver(undefined); // Clear the resolver to prevent memory leaks
        }
        setModal({ open: false, title: '', description: '' });
    };

    const openAddModal = async(type:any) => {
        const response = await GetUserGoal(auth.user.token, auth.user.id);
        setGoalCount(response.data.data ? response.data.data.length : 0);
        setAddModal({ open: true, type });
    }

    const closeAddModal = (confirm: boolean) => {
        if (addResolver) {
            addResolver({ confirm, description });
            setAddResolver(undefined); // Clear the resolver to prevent memory leaks
        }
        if(!confirm) setDescription('');
        setAddModal({ open: false, type: '' });
    }

    const openGoalsModal = (goals: any) => {
        setGoalsModal({ open: true, goals });
    }

    const closeGoalsModal = (confirm: boolean) => {
        setGoalsModal({ open: false, goals: [] });

        if (goalsResolver) {
            goalsResolver(confirm);
            setGoalsResolver(undefined); // Clear the resolver to prevent memory leaks
        }
    }

    const handleGoalsCreation = async() => {
        closeAddModal(true);
        openGoalsModal([]);
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const showFullScreenLoader = (show: boolean, message: string) => {
        setLoadingData({ loading: show, message: message });
    }

    const handleGoalsRegister = async() => {
        Array.from(selectedGoals).forEach(async(goal: any) => {   
            if(selectedGoals.find((g:any) => g.goal_name === goal.goal_name)){
                const response = await RegisterGoal(auth.user.token, goal);
            
                if(response.code !== "200") console.log("Error al añadir el objetivo");
            }
        });

        toast.success("Objetivos añadidos correctamente");
        CreateNotification(auth.user.token, "Objetivos añadidos correctamente");
        setTimeout(() => window.location.reload(), 500);
        return;
    }

    return(
        <div className='global-actions-container'>
            <ModalContext.Provider value={{ ...modal, openModal, closeModal, showFullScreenLoader, openAddModal, openGoalsModal, closeGoalsModal }}>
                <Modal
                    open={modal.open}
                    onClose={() => closeModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='flex justify-center items-start mt-10'
                >
                    <Box className="base-white p-5 w-96 rounded-md">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modal.title}
                        </Typography>
                        <Typography id="modal-modal-description" className='max-h-[60vh] overflow-scroll container-hide-bar' sx={{ mt: 2 }}>
                            {modal.description}
                        </Typography>
                        <div className='flex w-full gap-2 mt-8'>
                            <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeModal(false)}/>
                            <DefaultButton className='base-purple text-white w-1/2' text='Aceptar' onclick={() => closeModal(true)}/>
                        </div>
                    </Box>
                </Modal>
                <Modal
                    open={addModal.open}
                    onClose={() => closeAddModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='flex justify-center items-start mt-10'
                >
                    <Box className="base-white p-5 w-96 rounded-md">
                    {goalCount >= 5 ? 
                        <PremiumBlock feature="Crear más de 5 objetivos">
                            <div>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    ¿Cual será tu objetivo?
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <p className='mb-5'>Escribe una breve descripción y la inteligencia artificial se encargará de todo lo demás.</p>
                                    <TextField 
                                        className="w-full"
                                        type="text" 
                                        value={description} 
                                        onInput={handleDescription} 
                                        label={"Descripción"} 
                                        variant="outlined" 
                                    />
                                </Typography>
                                <div className='flex w-full gap-2 mt-8'>
                                    <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeAddModal(false)}/>
                                    <DefaultButton className='base-purple text-white w-1/2' text='Añadir' onclick={() => handleGoalsCreation()}/>
                                </div>
                            </div>
                        </PremiumBlock>
                    :
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ¿Cual será tu objetivo?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p className='mb-5'>Escribe una breve descripción y la inteligencia artificial se encargará de todo lo demás.</p>
                            <TextField 
                                className="w-full"
                                type="text" 
                                value={description} 
                                onInput={handleDescription} 
                                label={"Descripción"} 
                                variant="outlined" 
                                />
                        </Typography>
                            {(goalsModal.goals === null || goalsModal.goals.length > 0) &&
                                <div className='flex w-full gap-2 mt-8'>
                                    <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeAddModal(false)}/>
                                    <DefaultButton className='base-purple text-white w-1/2' text='Añadir' onclick={() => handleGoalsCreation()}/>
                                </div>
                            }
                    </div>
                    }
                    </Box>
                </Modal>
                <Modal
                    open={goalsModal.open}
                    onClose={() => closeGoalsModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='flex justify-center items-start mt-10'
                >
                    <Box className="base-white p-5 w-96 rounded-md">
                        <div>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                { goalsModal.goals && goalsModal.goals.length > 0 ?
                                    <>Hemos creado los siguientes retos para completar tu objetivo, escoge los que quieras añadir.</>
                                :
                                    <>Estamos creando tus objetivos...</>
                                }
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {goalsModal.goals && goalsModal.goals.length > 0 &&
                                    <div className='flex flex-col gap-2'>
                                        {goalsModal.goals.map((goal: any, index: number) => {
                                            if(goal.goal_target <= 10)
                                            {
                                                return(
                                                <div key={index} className='flex gap-2'>
                                                    <FormControlLabel 
                                                        value={index} 
                                                        control={
                                                            <Checkbox 
                                                                onChange={(e) => {
                                                                    if(e.target.checked)
                                                                        setSelectedGoals([...selectedGoals, goal]);
                                                                    else
                                                                        setSelectedGoals(selectedGoals.filter((item: any) => item !== goal));
                                                                }}
                                                            />
                                                        } 
                                                        label={goal.goal_name} 
                                                        checked={selectedGoals.includes(goal)}
                                                    />
                                                </div>)
                                            }
                                        }
                                        )}
                                    </div>
                                }
                            </Typography>
                            <div className='flex w-full gap-2 mt-8'>
                                {(goalsModal.goals === null || goalsModal.goals.length > 0) &&
                                    <div className='flex w-full gap-2 mt-8'>
                                        <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeGoalsModal(false)}/>
                                        <DefaultButton className='base-purple text-white w-1/2' text='Añadir' onclick={() => handleGoalsRegister()}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </Box>
                </Modal>
                <ToastContainer
                    onClick={(e) => console.log(e)}
                />
                <FullScreenLoader loadingData={loadingData}/>
                <Outlet/>
            </ModalContext.Provider>
        </div>
    );
}

export default PopupAlert