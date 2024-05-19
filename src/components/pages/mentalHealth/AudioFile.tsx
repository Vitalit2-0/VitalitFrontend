import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js';
import GradientButton from '../../helpers/GradientButton';

function AudioFile() {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [playing, setPlaying] = useState(false);
  
    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
            });
    
            wavesurfer.current.load('./assets/audios/images-sound.mp3');

            wavesurfer.current.on('ready', () => {
                
            });

            handlePlayPause();
            return () => wavesurfer.current?.destroy();
        }
    }, []);

    function handlePlayPause() {
        setPlaying(!playing);
        wavesurfer.current?.playPause();
    }
  
    return (
        <div>
            <div ref={waveformRef} className='invisible h-0'>
            </div>
            <GradientButton text={playing ? 'Pausar Sonidos' : 'Reproducir Sonidos'} className='base-gradient w-full' onClick={() => handlePlayPause()} />
        </div>
    );
}

export default AudioFile