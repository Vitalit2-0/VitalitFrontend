import { Box, Modal, Typography } from '@mui/material'
import QRCode from 'react-qr-code'
import CodeInput from './OtpValidator';

function Modal2fa({ qr, open, username, setOpen, isRegister, setValue2fa } : { qr?: string, open: boolean, username: string, setOpen: any, isRegister: boolean, setValue2fa?: any }) {

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex justify-center items-center'
            onClose={() => setOpen(false)}
        >
            <Box className="base-white p-5 w-96 rounded-md">
                {isRegister && qr &&
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Escanea el código QR con tu app de autenticación, luego introduce el código de 6 dígitos que te proporcionará la app.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="w-100 flex flex-col items-center pt-5">
                            <p className="color-purple text-center mb-5">Escanea el código QR con tu app de autenticación</p>
                            <QRCode className="w-44 h-44 mb-5" value={qr} />
                        </div>
                    </Typography>
                </div>
                }
                {!isRegister &&
                    <Typography className='text-center' id="modal-modal-title" variant="h6" component="h2">
                        Introduce el código de 6 dígitos que te proporciona la app de autenticación.
                    </Typography>
                }
                <div className='flex justify-center gap-2 mt-8'>
                    <CodeInput numberOfDigits={6} username={username} setOpen={setOpen} isRegister={isRegister} setValue2fa={setValue2fa} />
                </div>
            </Box>
        </Modal>
    )
}

export default Modal2fa