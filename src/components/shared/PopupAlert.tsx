import { Box, Modal, Typography } from '@mui/material';
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

    const [notification, setNotification] = useState({ text: '', type: 'success' }); 
    const [modal, setModal] = useState({ open: false, title: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [resolver, setResolver] = useState<(value: boolean | PromiseLike<boolean>) => void>();

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

    const showNotification = (message: string, type: string) => {
        setNotification({ text: message, type: type });
        setTimeout(() => {
            toast(message);
        }, 100);
    }

    const showFullScreenLoader = (show: boolean) => {
        console.log(show);
        setLoading(show);
    }

    return(
        <div className='global-actions-container'>
            <ModalContext.Provider value={{ ...modal, openModal, closeModal, showNotification, showFullScreenLoader }}>
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {modal.description}
                        </Typography>
                        <div className='flex gap-2 mt-8'>
                            <DefaultButton className='base-purple text-white w-1/2' text='Cancelar' onclick={() => closeModal(false)}/>
                            <DefaultButton className='base-purple text-white w-1/2' text='Aceptar' onclick={() => closeModal(true)}/>
                        </div>
                    </Box>
                </Modal>
                <ToastContainer
                    toastStyle={{
                        backgroundColor: notification.type === 'error' ? 'crimson' : 'green',
                        color: '#fff',
                    }}
                />
                <FullScreenLoader loading={loading}/>
                <Outlet/>
            </ModalContext.Provider>
        </div>
    );
}

export default PopupAlert