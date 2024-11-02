import { MouseEventHandler, useState } from "react";
import './audio.css';

const songs: {title: string, audio: HTMLAudioElement}[] = [
    {
        title: '1. Star Chaser',
        audio: new Audio("/super-combiner/song1.mp3")
    },
    {
        title: '2. Supernova Surge',
        audio: new Audio("/super-combiner/song2.mp3")
    },
    {
        title: '3. Zero Gravity Rush',
        audio: new Audio("/super-combiner/song3.mp3")
    },
    {
        title: '4. Cosmic Collision',
        audio: new Audio("/super-combiner/song4.mp3")
    }
]

const getPlayPause = (isPlaying: boolean, play: MouseEventHandler, pause: MouseEventHandler) => {
    if (isPlaying) {
        return <a href="#" onClick={pause}>◼</a>;
    } else {
        return <a href="#" onClick={play}>▶</a>;
    }
}

export const AudioPanel = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<number>(0);
    

    const play: MouseEventHandler = (e) => {
        songs[currentSong].audio.play();
        setIsPlaying(true);
        e.preventDefault();
    }

    const pause: MouseEventHandler = (e) => {
        songs[currentSong].audio.pause();
        setIsPlaying(false);
        e.preventDefault();
    }

    const next: MouseEventHandler = (e) => {
        if (isPlaying) {
            songs[currentSong].audio.pause();
        }
        let nextSong = currentSong + 1;
        if (nextSong >= songs.length) nextSong = 0;
        setCurrentSong(nextSong);
        if (isPlaying) {
            songs[nextSong].audio.play();
        }
        e.preventDefault();
    }

    return (
        <div className="audioPanel">
            <span className="icon">♫</span>
            <span className="hud">
                <span className="title">
                    { songs[currentSong].title }
                </span>
                <span className="playbackState">
                    { isPlaying ? 'Playing' : 'Paused' }
                </span>
            </span>
            {getPlayPause(isPlaying, play, pause)}
            <a className="next" href="#" onClick={next}>⏭</a>
        </div>
    )
}