import style from './game.module.css';
import { useState } from 'react';


const guessLimit = 5;

export default function Game({ gameConfig }) {
    console.log(gameConfig);
    if (gameConfig.color === 'rgb' && gameConfig.mode === 'mode 1') {
        return <RGBMode1 />
    }
    else {
        return <p>to be done...</p>
    }
}

function GenerateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
// guessState: active, hidden, late
function GuessWindow({ guessState, onGuessSubmitted }) {

    const [r, setR] = useState('');
    const [g, setG] = useState('');
    const [b, setB] = useState('');

    const r_int = parseInt(r);
    const g_int = parseInt(g);
    const b_int = parseInt(b);

    const [shake, setShake] = useState(false);

    function isGuessValid() {
        if (isNaN(r_int) || isNaN(g_int) || isNaN(b_int)) {
            return false;
        }
        if (r_int < 0 || r_int > 255) {
            return false;
        }
        if (g_int < 0 || g_int > 255) {
            return false;
        }
        if (b_int < 0 || b_int > 255) {
            return false;
        }
        return true;
    }

    function onSubmit() {
        if (!isGuessValid()) {
            setShake(true);
            setTimeout(() => setShake(false), 300);
            return;
        }
        // get input values from text boxes
        const inputValues = {
            r: r,
            g: g,
            b: b
        }
        // call onGuessSubmitted with input values
        onGuessSubmitted(inputValues);
    }

    const activeGuess = (
        <>
            <div className={style.text_inboxes}>
                <input className={`${style.text_input} ${style.red_input}`} type="text" onChange={
                    (e) => {
                        setR(e.target.value);
                    }
                } value={r} />
                <input className={`${style.text_input} ${style.green_input}`} type="text" onChange={
                    (e) => {
                        setG(e.target.value);
                    }
                } value={g} />
                <input className={`${style.text_input} ${style.blue_input}`} type="text" onChange={
                    (e) => {
                        setB(e.target.value);
                    }
                } value={b} />
            </div>
            <div className={style.game_buttons}>
                <button className={style.game_button} onClick={onResetClicked}>Reset</button>
                <button className={style.game_button} onClick={onSubmit}>Submit</button>
            </div>
        </>
    )

    const hiddenGuess = null;

    const lateGuess = (
        <>
            <div className={style.text_inboxes}>
                <input className={`${style.text_input} ${style.red_input}`} disabled value={r} />
                <input className={`${style.text_input} ${style.green_input}`} disabled value={g} />
                <input className={`${style.text_input} ${style.blue_input}`} disabled value={b} />
            </div>
            <div className={style.game_buttons}> </div>
        </>
    )

    function onResetClicked() {
        setR('');
        setG('');
        setB('');

    }

    return (
        <div className={`${style.guess} ${shake ? style.shake : null}`}>
            {guessState === 'active' && activeGuess}
            {guessState === 'hidden' && hiddenGuess}
            {guessState === 'late' && lateGuess}
        </div>
    )
}

function RGBMode1() {

    const [colorDisplay, setColorDisplay] = useState(GenerateRandomColor());
    const [activeGuessIndex, setActiveGuessIndex] = useState(0);

    function onNewGameClicked() {
        setActiveGuessIndex(0);
        setColorDisplay(GenerateRandomColor());
    }

    function showGuesses() {
        let guesses = [];
        for (let i = 0; i < guessLimit; i++) {
            if (i === activeGuessIndex) {
                guesses.push(<GuessWindow onGuessSubmitted={onGuessSubmitted} key={i} guessState="active"></GuessWindow>)
            }
            else if (i > activeGuessIndex) {
                guesses.push(<GuessWindow key={i} guessState="hidden"></GuessWindow>)
            }
            else {
                guesses.push(<GuessWindow key={i} guessState="late"></GuessWindow>)
            }
        }
        return guesses;
    }
    //inputValues = {r, g, b} int
    function onGuessSubmitted(inputValues) {
        console.log(inputValues);
        setActiveGuessIndex(activeGuessIndex + 1);
    }

    return (
        <div className={style.container}>
            <h1>RGB Mode 1</h1>
            <button className={style.new_game_button} onClick={onNewGameClicked}>New Game</button>
            <div className={style.game_container}>
                <div className={style.color_container}>
                    <div className={style.square} style={{ backgroundColor: colorDisplay }}></div>
                </div>
                <div className={style.guesses_container}>
                    {showGuesses()}
                </div>
            </div>
        </div>
    )
}