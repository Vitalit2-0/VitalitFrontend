import {Flex,
        ChakraProvider,
        Input,
        Button,
        InputGroup,
        Stack,
        Box,
        Image,
        FormControl,
} from "@chakra-ui/react";
import NavigationManager from "../services/NavigationManager";
import { SendRecoverMail } from "../services/AuthStateProvider";
import { useRef } from "react";
import { toast } from "react-toastify";

function RecoverPass() {

    const emailRef = useRef<HTMLInputElement>(null)

    async function handleSendMail(e:any) {
        e.preventDefault();
        const response = await SendRecoverMail(emailRef.current?.value || "");

        console.log(response)
        if(!response.data) {
            toast.error("No se encontró el correo electronico. ¿Si estás registrado?");
            return;
        }

        toast.success("Correo enviado! Revisa tu bandeja de entraday spam para continuar con el proceso de recuperación de contraseña.");

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
                    padding="10px"
                >
                    <Image className="w-2/3" src="assets/images/logoVitalitBlanco.png" onClick={() => NavigationManager.navigateTo("/")} alt="Logo Vitalit"/>
                    <h3 className="bg-text-login text-center mb-5">Enviaremos un link a tu correo electrónico para cabiar tu contraseña</h3>
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
                                            type="email" 
                                            placeholder='Correo Electrónico' 
                                            _placeholder={{color: "purple"}}
                                            ref={emailRef}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <Button
                                    borderRadius={10}
                                    color="purple"
                                    type="submit"
                                    variant="solid"
                                    colorScheme="gray"
                                    width="full"
                                    onClick={handleSendMail}
                                >
                                    Enviar correo
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <p className='text-white mt-5'>
                    <a className='color-white text-center' onClick={() => NavigationManager.navigateTo("/login")}>Regresar</a>
                </p>
            </Flex>
        </ChakraProvider>
    )
}

export default RecoverPass