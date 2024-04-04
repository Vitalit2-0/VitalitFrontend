import useUserStore from "../stores/userStore";
import { AuthStateProvider } from '../services/AuthStateProvider'
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

type ErrorResponse = {
    message: string;
    valid: boolean;
}

function Register() {
    const handleShowClick = () => setShowPassword(!showPassword)
    const registerUser:any = useUserStore((state:any) => state.setUser);

    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState("");

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

        setShowError("");

        const registerDto: RegisterDto = {
            name: nameRef.current?.value || "",
            lastname: lastNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            username: usernameRef.current?.value || "",
            password: passwordRef.current?.value || ""
        };

        var auth = new AuthStateProvider();
        var response: ResponseDto = await auth.registerUser(registerDto);
        
        if(!response.data)
        {
            setShowError(response.string);
            return;
        }
        
        registerUser(response.data);
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

    return (
        <ChakraProvider>
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
                    <Image className="w-2/3" src="../assets/images/logoVitalitBlanco.png" onClick={() => NavigationManager.navigateTo("/")} alt="Logo Vitalit"/>
                    <h3 className="bg-text-login text-center mb-5">Accede a Vitalit y cambia por completo tu vida!</h3>
                    <Box minW={{ base: "90%", md: "468px"}}>
                        <form onSubmit={handleRegister}>
                            <Stack
                                className="base-gradient rounded-2xl"
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
                </Stack>
                <p className='text-white mt-5'>
                    ¿Ya tienes una cuenta?{" "}
                    <a className='color-white text-center' onClick={() => NavigationManager.navigateTo("/login")}>Iniciar sesión</a>
                </p>
                <p className="text-white mt-3">
                    Recopilaremos algunos datos para una excelente experiencia.{" "}
                    <a className="color-white text-center" href="/#">Saber más.</a>
                </p>
            </Flex>
        </ChakraProvider>
    )
}

export default Register