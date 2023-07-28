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

    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);



    function onSubmit() {
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
                } />
                <input className={`${style.text_input} ${style.green_input}`} type="text" onChange={
                    (e) => {
                        setG(e.target.value);
                    }
                } />
                <input className={`${style.text_input} ${style.blue_input}`} type="text" onChange={
                    (e) => {
                        setB(e.target.value);
                    }
                } />
            </div>
            <div className={style.game_buttons}>
                <button className={style.game_button}>Reset</button>
                <button className={style.game_button} onClick={onSubmit}>Submit</button>
            </div>
        </>
    )

    const hiddenGuess = null;

    const lateGuess = (
        <>
            <div className={style.text_inboxes}>
                <input className={`${style.text_input} ${style.red_input}`} type="text" />
                <input className={`${style.text_input} ${style.green_input}`} type="text" />
                <input className={`${style.text_input} ${style.blue_input}`} type="text" />
            </div>
            <div className={style.game_buttons}> </div>
        </>
    )

    return (
        <div className={style.guess}>
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