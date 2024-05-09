function StatusBar( { title, seconds } : { title: string, seconds: number }) {
    return (
        <div className='p-5 base-gradient rounded-lg flex justify-between items-center'>
            <h1 className='text-white font-bold'>{title}</h1>
            {seconds > 0 && <span className='h-full items-center text-5xl font-bold text-white'>{seconds}</span>}
        </div>
    )
}

export default StatusBar