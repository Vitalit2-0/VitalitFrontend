import {Flex,
    ChakraProvider,
    Input,
    Button,
    InputGroup,
    Stack,
    Box,
    Image,
    FormControl,
    InputRightElement,
} from "@chakra-ui/react";
import NavigationManager from "../services/NavigationManager";
import { useEffect, useRef, useState } from "react";

function Restore() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

    const handleShowPass = () =>{
        setShowPassword(!showPassword);
    } 

    const handleShowConfirmPass = () =>{
        setShowConfirmPassword(!showConfirmPassword);
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
                    <Image className="w-2/3" src="assets/images/logoVitalitBlanco.png" alt="Logo Vitalit"/>
                    <h3 className="bg-text-login text-center mb-5">Ingresa tu nueva contraseña</h3>
                    <Box minW={{ base: "90%", md: "468px"}}>
                        <form>
                            <Stack
                                className="base-gradient rounded-2xl"
                                spacing={4}
                                p="1rem"
                                boxShadow="md"
                            >
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
                                            <Button className='mr-2' h="1.5rem" size="sm" onClick={() => handleShowPass()}>
                                                {showPassword ? "Ocultar" : "Mostrar"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup className="bg-input-login" borderRadius={10}>
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirmar contraseña"
                                            _placeholder={{color: "purple"}}
                                            ref={passwordConfirmRef}
                                            name="password"
                                            required
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button className='mr-2' h="1.5rem" size="sm" onClick={() => handleShowConfirmPass()}>
                                                {showConfirmPassword ? "Ocultar" : "Mostrar"}
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
                                >
                                    Reestablecer contraseña
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </ChakraProvider>
    )
}

export default Restore