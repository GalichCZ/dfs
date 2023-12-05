import './App.css'
import { useEffect, useRef, useState } from "react";


function App() {
    const initialTimeDraw = 600; // 10 minutes in secondsDrawing
    const initialTimeInspiration = 300; // 5 minutes in secondsDrawing
    const [secondsDrawing, setSecondsDrawing] = useState(initialTimeDraw);
    const [secondsInspiration, setSecondsInspiration] = useState(initialTimeInspiration);
    const [isRunningDrawing, setIsRunningDrawing] = useState(false);
    const [isRunningInspiration, setIsRunningInspiration] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const handleResetDrawClick = () => {
        setSecondsDrawing(initialTimeDraw);
        setIsRunningDrawing(false);
    };

    const handleResetInspirationClick = () => {
        setSecondsInspiration(initialTimeInspiration);
        setIsRunningInspiration(false);
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunningDrawing && secondsDrawing > 0) {
            interval = setInterval(() => {
                setSecondsDrawing((prevSecondsDrawing) => prevSecondsDrawing - 1);
            }, 1000);
        }

        if (secondsDrawing === 0) {
            handleResetDrawClick();
            if (audioRef.current) {
                audioRef.current.play();
            }
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunningDrawing, secondsDrawing]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isRunningInspiration && secondsInspiration > 0) {
            interval = setInterval(() => {
                setSecondsInspiration((prevSecondsInspiration) => prevSecondsInspiration - 1);
            }, 1000);
        }

        if (secondsInspiration === 0) {
            handleResetInspirationClick();
            if (audioRef.current) {
                audioRef.current.play();
            }
        }

        return () => {
            clearInterval(interval);
        }
    }, [isRunningInspiration, secondsInspiration]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleStartStopDrawClick = () => {
        setIsRunningDrawing((prevRunningDrawing) => !prevRunningDrawing);
    };

    const handleStartStopInspirationClick = () => {
        setIsRunningInspiration((prevRunningInspiration) => !prevRunningInspiration);
    }

  return (
    <section className="main__page">
        <h1 className="head">
            <span>D</span>
            <span>R</span>
            <span>A</span>
            <span>W</span>
            <br/>
            <span>F</span>
            <span>O</span>
            <span>R</span>
            <br/>
            <span>S</span>
            <span>O</span>
            <span>M</span>
            <span>E</span>
            <span>O</span>
            <span>N</span>
            <span>E</span>
        </h1>
        <div className="rules">
            <h3>Rules</h3>
            <ul>
                <li>Googling (inspiration) time - 5 minutes</li>
                <li>Drawing - 10 minutes</li>
                <li>Switch around your works</li>
                <li>6 rounds (obviously it's up to you)</li>
                <li>You don't see each others sheets before switch</li>
            </ul>
        </div>

        <div className='timer'>
            <audio ref={audioRef} src="/public/end.mp3" />
            <div className='timer__draw'>
                <h4>Timer Drawing</h4>
                <p>{formatTime(secondsDrawing)}</p>
                <div className="timer__buttons">
                    <button className="button" onClick={handleStartStopDrawClick}>{isRunningDrawing ? 'Pause' : 'Start'}</button>
                    <button className="button" onClick={handleResetDrawClick}>Reset</button>
                </div>
            </div>
            <div className='timer__inspiration'>
                <h4>Timer Inspiration</h4>
                <p>{formatTime(secondsInspiration)}</p>
                <div className="timer__buttons">
                    <button className="button" onClick={handleStartStopInspirationClick}>{isRunningInspiration ? 'Pause' : 'Start'}</button>
                    <button className="button" onClick={handleResetInspirationClick}>Reset</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default App
