import NavigationButton from "../components/helpers/NavigationButton"

function RecoverPass() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <p>Recuperar contraseña</p>
            <NavigationButton page="/" text="Volver"/>
        </div>
    )
}

export default RecoverPass