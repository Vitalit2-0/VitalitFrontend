import { AuthStateProvider } from '../services/AuthStateProvider'
import useUserStore from "../stores/userStore";
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

function Login({ transition } : { transition: string }) {
    const registerUser:any = useUserStore((state:any) => state.setUser);

    const loginRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    async function handleLogin() {

        const loginDto: LoginDto = {
            login: loginRef.current?.value || "",
            password: passwordRef.current?.value || ""
        };

        var auth = new AuthStateProvider();
        var user: User = await auth.loginUser(loginDto);
    
        if(user)
        {
            registerUser(user);
            window.location.href = '/home';
        }
    }

    function navigateToHome() {
        window.location.href = '/';
    }

    function navigateToRecover() {
        window.location.href = '/recover';
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword)

    return (
        <ChakraProvider>
            <div className={`expandable-element ${transition} absolute top-0 right-0 flex h-screen flex-col justify-center items-center gap-2 base-gradient z-50`} transition-style="in:circle:bottom-left">
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
                    >
                        <Image src="../assets/images/logoVitalitBlanco.png" onClick={() => navigateToHome()} alt="Logo Vitalit"/>
                        <h3 className="bg-text-login text-center mb-5">Accede a Vitalit y cambia por completo tu vida!</h3>
                        <Box minW={{ base: "90%", md: "468px"}}>
                            <form>
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
                                                placeholder='Correo Electrónico, teléfono o usuario' 
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
                                    <Button
                                        borderRadius={10}
                                        color="purple"
                                        type="submit"
                                        variant="solid"
                                        colorScheme="gray"
                                        width="full"
                                        onClick={() => handleLogin()}
                                    >
                                        Iniciar sesión
                                    </Button>
                                    <a className='color-white text-center' onClick={() => navigateToRecover()}>¿Olvidaste tu contraseña?</a>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                    <p className='text-white mt-5'>
                        No tienes cuenta?{" "}
                        <a className='color-white text-center' href="/register" >
                            Regístrate
                        </a>
                    </p>
                </Flex>
            </div>
        </ChakraProvider>
    )
}

export default Login