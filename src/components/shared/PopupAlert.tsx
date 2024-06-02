import { Box, Modal, TextField, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import DefaultButton from '../helpers/DefaultButton';
import { ToastContainer, toast } from 'react-toastify';
import FullScreenLoader from './FullScreenLoader';

const ModalContext = createContext<any>(null)

export function useModal() {
    return useContext(ModalContext);
}

function PopupAlert() {

    const [addModal, setAddModal] = useState({ open: false, type: '' });
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState({ text: '', type: 'success' }); 
    const [modal, setModal] = useState({ open: false, title: '', description: '' });
    const [loadingData, setLoadingData] = useState({ loading: false, message: '' });
    const [resolver, setResolver] = useState<(value: boolean | PromiseLike<boolean>) => void>();
    const [addResolver, setAddResolver] = useState<(value: {confirm: boolean, description: string} | PromiseLike<{}>) => void>();

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

    const openAddModal = (type:any) => {
        setAddModal({ open: true, type });
        return new Promise<{}>((resolve) => {
            setAddResolver(() => resolve);
        });
    }

    const closeAddModal = (confirm: boolean) => {
        if (addResolver) {
            addResolver({ confirm, description });
            setAddResolver(undefined); // Clear the resolver to prevent memory leaks
        }
        setDescription('');
        setAddModal({ open: false, type: '' });
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const showNotification = (message: string, type: string) => {
        setNotification({ text: message, type: type });
        setTimeout(() => {
            toast(message);
        }, 100);
    }

    const showFullScreenLoader = (show: boolean, message: string) => {
        setLoadingData({ loading: show, message: message });
    }

    return(
        <div className='global-actions-container'>
            <ModalContext.Provider value={{ ...modal, openModal, closeModal, showNotification, showFullScreenLoader, openAddModal }}>
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
                        <Typography id="modal-modal-description" className='max-h-[60vh] overflow-scroll' sx={{ mt: 2 }}>
                            {modal.description}
                        </Typography>
                        <div className='flex gap-2 mt-8'>
                            <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeModal(false)}/>
                            <DefaultButton className='base-purple text-white w-1/2' text='Aceptar' onclick={() => closeModal(true)}/>
                        </div>
                    </Box>
                </Modal>
                <Modal
                    open={addModal.open}
                    onClose={() => closeModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='flex justify-center items-start mt-10'
                >
                    <Box className="base-white p-5 w-96 rounded-md">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ¿Cual será tu {addModal.type}?
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
                        <div className='flex gap-2 mt-8'>
                            <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeAddModal(false)}/>
                            <DefaultButton className='base-purple text-white w-1/2' text='Añadir' onclick={() => closeAddModal(true)}/>
                        </div>
                    </Box>
                </Modal>
                <ToastContainer
                    toastStyle={{
                        backgroundColor: notification.type === 'error' ? 'crimson' : 'green',
                        color: '#fff',
                    }}
                />
                <FullScreenLoader loadingData={loadingData}/>
                <Outlet/>
            </ModalContext.Provider>
        </div>
    );
}

export default PopupAlert