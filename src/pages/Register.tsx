import { useRef, useState } from 'react';
import NavigationManager from "../services/NavigationManager";
import {Flex,
        ChakraProvider,
        Input,
        Button,
        InputGroup,
        Stack,
        Box,
        Image,
        FormControl,
        InputRightElement
} from "@chakra-ui/react";
import { FieldsValidator } from "../services/FieldsValidator";
import { registerUser } from '../services/AuthStateProvider';
import { Modal, Typography } from '@mui/material';
import DefaultButton from '../components/helpers/DefaultButton';
import { useModal } from '../components/shared/PopupAlert';

function Register() {
    const handleShowClick = () => setShowPassword(!showPassword)
    const {showFullScreenLoader} = useModal();
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const emailRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    async function handleRegister(event: React.FormEvent) {
        event.preventDefault();
        
        let validUser = validateUser();
        
        if(!validUser.valid)
        {
            setShowError(validUser.message);
            return;
        }
            
        showFullScreenLoader(true, "Espera un momento...");
        setShowError("");

        const registerDto: RegisterDto = {
            name: nameRef.current?.value || "",
            lastname: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            username: usernameRef.current?.value || "",
            password: passwordRef.current?.value || ""
        };

        var response: ResponseDto = await registerUser(registerDto);
        
        if(!response.data)
        {
            showFullScreenLoader(false, "");
            setShowError(response.string);
            return;
        }
        
        showFullScreenLoader(false, "");
        NavigationManager.navigateTo('/login', "", {message: "Usuario registrado con éxito, por favor inicia sesión con  tus credenciales"});
    }

    function validateUser(): ErrorResponse {
        const fields = 
        [
            { ref: emailRef, errorMessage: "Correo inválido" },
            { ref: usernameRef, errorMessage: "El nombre de usuario debe tener más de 3 caracteres" },
            { ref: nameRef, errorMessage: "El nombre debe tener más de 3 caracteres" },
            { ref: lastNameRef, errorMessage: "El apellido debe tener más de 3 caracteres"},
            { ref: passwordRef, errorMessage: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial" },
        ];

        for (const field of fields) 
        {
            let ref = field.ref.current;
            const isValid = FieldsValidator.validateField(ref?.name || "", ref?.value || "");

            if (!isValid) {
                return { message: field.errorMessage, valid: false };
            }
        }

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            return { message: "Las contraseñas no coinciden", valid: false };
        }

        return { message: "", valid: true };
    }

    const handleToggleModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <ChakraProvider>
            <Modal
                    open={openModal}
                    onClose={() => handleToggleModal()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='flex justify-center items-start mt-10'
                >
                    <Box className="base-white p-5  md:w-1/2 lg:w-1/3 rounded-md">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1 className='text-2xl'>Términos y Condiciones Vitalit</h1>
                        </Typography>
                        <Typography id="modal-modal-description" className='max-h-[60vh] overflow-scroll' sx={{ mt: 2 }}>
                        <h2 className='font-bold'>1. Introducción</h2>
                        <p>Bienvenido a Vitalit. Al utilizar nuestra plataforma, aceptas estar sujeto a los siguientes términos y condiciones. Por favor, léelos cuidadosamente.</p>

                        <h2 className='font-bold'>2. Definiciones</h2>
                        <ul>
                            <li><span className='color-purple font-bold'>Vitalit:</span> Se refiere a la plataforma web y aplicación móvil dedicada a la gestión del bienestar personal.</li>
                            <li><span className='color-purple font-bold'>Usuario:</span> Cualquier persona que acceda y utilice los servicios de Vitalit.</li>
                            <li><span className='color-purple font-bold'>Servicios:</span> Incluyen todas las funcionalidades ofrecidas por Vitalit, tanto gratuitas como de pago.</li>
                        </ul>

                        <h2 className='font-bold'>3. Aceptación de Términos</h2>
                        <p>Al acceder y utilizar los servicios de Vitalit, el usuario acepta cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de los términos, no debes usar nuestros servicios.</p>

                        <h2 className='font-bold'>4. Servicios de Vitalit</h2>
                        <p>Vitalit ofrece una plataforma integral que proporciona herramientas para la gestión del bienestar personal, incluyendo:</p>
                        <ul className='list-disc'>
                            <li>- Planes de entrenamiento personalizados.</li>
                            <li>- Planes nutricionales.</li>
                            <li>- Planes de Salud Mental</li>
                            <li>- Recordatorios y notificaciones personalizadas.</li>
                        </ul>

                        <h2 className='font-bold'>5. Registro de Usuario</h2>
                        <p>Para utilizar ciertos servicios, el usuario debe registrarse en la plataforma proporcionando información precisa y actualizada. El usuario es responsable de mantener la confidencialidad de su cuenta y contraseña.</p>

                        <h2 className='font-bold'>6. Suscripciones y Pagos</h2>
                        <ul>
                            <li><strong className='color-purple font-bold'>Suscripciones de Pago:</strong> Los usuarios pueden suscribirse a planes premium para acceder a funcionalidades avanzadas. Los pagos son recurrentes mensualmente o anualmente según el plan seleccionado.</li>
                            <li><strong className='color-purple font-bold'>Cancelación:</strong> Los usuarios pueden cancelar su suscripción en cualquier momento, pero no se reembolsarán los pagos ya efectuados. La cancelación será efectiva al final del periodo de facturación actual.</li>
                        </ul>

                        <h2 className='font-bold'>7. Políticas de Reembolso</h2>
                        <p>No se otorgarán reembolsos por suscripciones ya pagadas. Los usuarios podrán seguir disfrutando de los servicios premium hasta el final del periodo de facturación en curso tras la cancelación.</p>

                        <h2 className='font-bold'>8. Uso Aceptable</h2>
                        <p>El usuario se compromete a utilizar los servicios de manera responsable y legal. Está prohibido:</p>
                        <ul>
                            <li>- Utilizar la plataforma para cualquier actividad ilícita.</li>
                            <li>- Intentar acceder sin autorización a los sistemas de Vitalit.</li>
                            <li>- Publicar contenido ofensivo, difamatorio o que viole los derechos de terceros.</li>
                        </ul>

                        <h2 className='font-bold'>9. Privacidad y Protección de Datos</h2>
                        <p>Vitalit se compromete a proteger la privacidad de los usuarios. Consulta nuestra <a href="http://localhost:5173/VitalitFrontend/#/privacy-policy">Política de Privacidad</a> para obtener más información sobre cómo recopilamos y utilizamos tus datos personales.</p>

                        <h2 className='font-bold'>10. Propiedad Intelectual</h2>
                        <p>Todo el contenido disponible en Vitalit, incluyendo textos, gráficos, logos, íconos y software, es propiedad de Vitalit o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.</p>

                        <h2 className='font-bold'>11. Modificaciones de los Términos</h2>
                        <p>Vitalit se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán efectivos a partir de su publicación en nuestro sitio web. El uso continuado de los servicios tras la publicación de cambios implica la aceptación de los mismos.</p>

                        <h2 className='font-bold'>12. Limitación de Responsabilidad</h2>
                        <p>Vitalit no se responsabiliza por cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de uso de nuestros servicios.</p>

                        <h2 className='font-bold'>13. Ley Aplicable</h2>
                        <p>Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de Colombia. Cualquier disputa que surja en relación con estos términos se someterá a la jurisdicción exclusiva de los tribunales de Bogotá, Colombia.</p>

                        <h2 className='font-bold'>14. Contacto</h2>
                        <p>Para cualquier consulta o reclamación relacionada con estos términos y condiciones, por favor, contacta con nosotros a través de <a href="mailto:vvitalit.co@gmail.com">vvitalit.co@gmail.com</a>.</p>
                        <p className='text-center my-4 color-purple font-bold p-2 bg-purple-200 rounded-lg'>
                            Al registrarte aceptas los términos y condiciones de Vitalit.
                        </p>
                        </Typography>
                        <div className='flex justify-end gap-2 mt-8'>
                            <DefaultButton className='base-purple text-white w-1/2' text='Aceptar' onclick={() => handleToggleModal()}/>
                        </div>
                    </Box>
                </Modal>
            <Flex
                className="base-gradient"
                flexDirection="column"
                width="100vw"
                minHeight="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                    maxW="480px"
                    padding="30px 10px"
                >
                    <Image className="w-2/3" src="assets/images/logoVitalitBlanco.png" onClick={() => NavigationManager.navigateTo("/")} alt="Logo Vitalit"/>
                    <h3 className="bg-text-login text-center mb-5">Accede a Vitalit y cambia por completo tu vida!</h3>
                    <Box minW={{ base: "90%", md: "468px"}}>
                        <form onSubmit={handleRegister}>
                            <Stack
                                className="base-gradient rounded-2xl w-full"
                                spacing={4}
                                p="1rem"
                                boxShadow="md"
                            >
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={100}>
                                        <Input 
                                            type="email" 
                                            placeholder='Correo Electrónico' 
                                            _placeholder={{color: "purple"}} 
                                            ref={emailRef}
                                            name="email"
                                            required
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={100}>
                                        <Input 
                                            type="username"
                                            placeholder="Nombre de usuario" 
                                            _placeholder={{color: "purple"}} 
                                            ref={usernameRef}
                                            name="username"
                                            required
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={100}>
                                        <Input 
                                            type="name"
                                            placeholder="Nombres" 
                                            _placeholder={{color: "purple"}} 
                                            ref={nameRef}
                                            name="name"
                                            required/>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={100}>
                                        <Input 
                                            type="last-name"
                                            placeholder="Apellidos" 
                                            _placeholder={{color: "purple"}} 
                                            ref={lastNameRef}
                                            name="last-name"
                                            required/>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={10}>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Contraseña"
                                            _placeholder={{color: "purple"}}
                                            ref={passwordRef}
                                            name="password"
                                            required
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button className='mr-2' h="1.5rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? "Ocultar" : "Mostrar"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={10}>
                                        <Input
                                            type={"password"}
                                            placeholder="Confirma tu contraseña"
                                            _placeholder={{color: "purple"}}
                                            ref={confirmPasswordRef}
                                            name="confirmPassword"
                                            required
                                        />
                                    </InputGroup>
                                </FormControl>
                                {showError && <p className="text-white">{showError}</p>}
                                <Button
                                    borderRadius={10}
                                    color="purple"
                                    type="submit"
                                    variant="solid"
                                    colorScheme="gray"
                                    width="full"
                                >
                                    Registrarme
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                    <p className='text-white mt-5'>
                        ¿Ya tienes una cuenta?{" "}
                        <a className='color-white text-center' onClick={() => NavigationManager.navigateTo("/login")}>Iniciar sesión</a>
                    </p>
                    <p className="text-white text-center mt-3">
                        Recopilaremos algunos datos para una excelente experiencia.{" "}
                        <a className="color-white text-center cursor-pointer" onClick={() => handleToggleModal()}>Saber más.</a>
                    </p>
                </Stack>
            </Flex>
        </ChakraProvider>
    )
}

export default Register