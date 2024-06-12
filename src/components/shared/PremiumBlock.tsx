import React from 'react'
import Dot from '../stylers/Dot'
import useAuthStore from '../../stores/AuthStore'

function PremiumBlock({ feature, children }: { feature: string, children?: React.ReactNode }) {
    
    const user = useAuthStore((state:any) => state.user)
    
    return (
        user.type !== 'premium' ? <div className='relative w-full h-[60vh] flex items-center shadow-2xl rounded-xl overflow-hidden'>
            <div className='rounded absolute top-[10%] w-full h-[50vh] blur-2xl'>
                <Dot width={"256px"} color='#60cffc' top='5%' right='15%'  />
                <Dot width={"256px"} color='#ef6990' bottom='5%' left='30%' />
                <Dot width={"256px"} color='#ff9a32' top='5%' left='15%' />
            </div>
            <div className='z-20 px-[10%] text-center'>
                <img src="assets/images/premium.png" className='w-36 mx-auto' alt="" />
                <h2 className='text-black font-bold'>
                    {feature} es una funcionalidad premium. ¡Mejora tu plan en los ajustes y accede a esta y otras funcionalidades exclusivas!
                </h2>
            </div>
        </div> : children
    )
}

export default PremiumBlock