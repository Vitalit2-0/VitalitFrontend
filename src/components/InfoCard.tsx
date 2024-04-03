function InfoCard({ icon, title, text } : { icon: string, title: string, text: string }) {
    return (
        <div className="base-white w-1/2 p-10 rounded-3xl shadow-card text-center mr-5">
            <img className="w-1/4 m-auto" src={icon} alt="" />
            <h3 className="text-2xl color-purple font-bold mt-5 mb-5">{title}</h3>
            <p className="leading-8">{text}</p>
        </div>
    )
}

export default InfoCard