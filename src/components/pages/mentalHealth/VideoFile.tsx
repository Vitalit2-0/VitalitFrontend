import { useEffect, useRef } from 'react'

function VideoFile({src} : {src:string}) {

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {    
        videoRef.current?.load();
    }, [src]);

    return (
        <video ref={videoRef} className='w-full sm:rounded-lg' loop autoPlay>
            <source src={src} type="video/mp4" />
        </video>
    )
}

export default VideoFile