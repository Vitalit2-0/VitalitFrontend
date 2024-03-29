import NavigationButton from "../components/helpers/NavigationButton"

function Register() {
    return (
        <div className="flex h-screen base-gradient flex-col gap-2 justify-center items-center">
            <p>Register</p>
            <NavigationButton page="/" text="Volver"/>
        </div>
    )
}

export default Register