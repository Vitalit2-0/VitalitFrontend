import { useRef, useState } from 'react';
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
import { useSearchParams, useNavigate } from 'react-router-dom';
import React from 'react';
import NavigationManager from '../services/NavigationManager';
import useAuthStore from '../stores/AuthStore';
import { loginUser, validateUser } from '../services/AuthStateProvider';
import ModalQr from '../components/shared/Modal2fa';
import { toast } from 'react-toastify';
import { useModal } from '../components/shared/PopupAlert';

function Login({ transition } : { transition: string }) {

    const {showFullScreenLoader} = useModal();

    const [showError, setShowError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [show, setShow] = React.useState(true);
    const [faUsername, setfaUsername] = useState("")
    
    const user: any = useAuthStore(state => state)
    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const handleShowClick = () => setShowPassword(!showPassword)

    const [queryParameters] = useSearchParams()
    let history = useNavigate();

    React.useEffect(() => {
        let message = queryParameters.get("message");
        
        if(message) 
        {
            setShowError(message);
            history("/login");
        }
    }, []);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        showFullScreenLoader(true, "Espera un momento...");

        const loginDto: LoginDto = {
            login: loginRef.current?.value || "",
            password: passwordRef.current?.value || ""
        };

        let response: ResponseDto = await loginUser(loginDto);
    
        if(!response.data)
        {
            console.log(response);
            toast.error(response.string);
            showFullScreenLoader(false, "");
            return;
        }
        
        if(!response.data.ft_login)
        {
            response = await validateUser({code: "000000", login: response.data.username});

            if(response.code !== "200")
            {
                setShowError(response.string);
                showFullScreenLoader(false, "");
                return;
            }

            user.login(response.data);
            setShow(false);
            NavigationManager.navigateTo("/dashboard", "", { login: true });
            return;
        }

        showFullScreenLoader(false, "");
        setfaUsername(response.data.username);
        setOpen(true);
    }

    return (
        <ChakraProvider>
            <ModalQr isRegister={false} open={open} setOpen={setOpen} username={faUsername} />
            {show && <div className={`expandable-element ${transition} absolute top-0 right-0 flex h-screen flex-col justify-center items-center gap-2 base-gradient z-50`} transition-style={(transition == "animate") ? "in:circle:bottom-left": ""}>
                <Flex
                    className="base-gradient"
                    flexDirection="column"
                    width="100vw"
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack
                        flexDir="column"
                        mb="2"
                        justifyContent="center"
                        alignItems="center"
                        maxW="480px"
                        padding="10px"
                    >
                        <Image className="w-2/3" src="assets/images/logoVitalitBlanco.png" onClick={() => {NavigationManager.navigateTo("/"); window.location.reload()}} alt="Logo Vitalit"/>
                        <h3 className="bg-text-login text-center mb-5">Accede a Vitalit y cambia por completo tu vida!</h3>
                        <Box minW={{ base: "90%", md: "468px"}}>
                            <form onSubmit={handleLogin}>
                                <Stack
                                    className="base-gradient rounded-2xl"
                                    spacing={4}
                                    p="1rem"
                                    boxShadow="md"
                                >
                                    <FormControl>
                                        <InputGroup className="bg-input-login" borderRadius={100}>
                                            <Input 
                                                type="text" 
                                                placeholder='Correo Electrónico o usuario' 
                                                _placeholder={{color: "purple"}}
                                                ref={loginRef}
                                                name="login"
                                                required
                                            />
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
                                    {showError && <p className="text-white">{showError}</p>}
                                    <Button
                                        borderRadius={10}
                                        color="purple"
                                        type="submit"
                                        variant="solid"
                                        colorScheme="gray"
                                        width="full"
                                    >
                                        Iniciar sesión
                                    </Button>
                                    <a className='color-white text-center' onClick={() => NavigationManager.navigateTo("/recover")}>¿Olvidaste tu contraseña?</a>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                    <p className='text-white mt-5'>
                        No tienes cuenta?{" "}
                        <a className='color-white text-center' onClick={() => NavigationManager.navigateTo("/register")} >
                            Regístrate
                        </a>
                    </p>
                </Flex>
            </div>}
        </ChakraProvider>
    )
}

export default Login