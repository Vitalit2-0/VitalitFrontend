//import { Button } from "@mui/material"
import { AuthStateProvider } from '../services/AuthStateProvider'
//import NavigationButton from "../components/helpers/NavigationButton";
import useUserStore from "../stores/userStore";

import { useState } from 'react';
import {Flex,
        Heading,
        Input,
        Button,
        InputGroup,
        Stack,
        Box,
        Link,
        Image,
        FormControl,
        InputRightElement
} from "@chakra-ui/react";

function Login() {
    const registerUser:any = useUserStore((state:any) => state.setUser);

    function setUser(User : User) 
    {
        registerUser(User);
    }

    async function handleLogin() {
        var auth = new AuthStateProvider();
        var user: User = await auth.getUserAuthState();
    
        if(user)
        {
            setUser(user);
            window.location.href = '/home';
        }
    }

    function navigateToRecover() {
        window.location.href = '/recover';
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword)

    return (
        <Flex
            className="base-gradient"
            flexDirection="column"
            width="100wh"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Image width="468px" src="../assets/images/logoVitalitBlanco.png" alt="Logo Vitalit"/>
                <Heading width="468px" textAlign="center" color="white" fontFamily="Poppins" fontSize="25px" fontWeight="normal" >Accede a Vitalit y cambia por completo tu vida!</Heading>
                <Box minW={{ base: "90%", md: "468px"}}>
                    <form>
                        <Stack
                            className="base-gradient"
                            spacing={4}
                            p="1rem"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <Input backgroundColor="white" type="email" placeholder='Correo Electrónico' _placeholder={{color: "purple"}}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        _placeholder={{color: "purple"}}
                                        backgroundColor="white"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.5rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Ocultar" : "Mostrar"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                color="purple"
                                type="submit"
                                variant="solid"
                                colorScheme="gray"
                                width="full"
                                onClick={() => handleLogin()}
                            >
                                Iniciar sesión
                            </Button>
                            <Link color="white" textAlign="center" onClick={() => navigateToRecover()}>¿Olvidaste tu contraseña?</Link>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box marginTop="2rem" color="white" fontSize="1.5rem">
                No tienes cuenta?{" "}
                <Link color="white" fontWeight="bold" href="/register" >
                    Regístrate
                </Link>
            </Box>
        </Flex>
    )
}

export default Login