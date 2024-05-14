import React from 'react'

function VideoThumbnail({url} : {url: string}) {


    React.useEffect(() => {
    }, [])

    return (
        <img src={url} alt="" />
    )
}

export default VideoThumbnail