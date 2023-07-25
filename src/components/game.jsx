import style from './game.module.css';
import { useState } from 'react';

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

function GuessWindow() {
    return (
        <div className={style.guess}>
            <div className={style.text_inboxes}>
                <input className={`${style.text_input} ${style.red_input}`} type="text" />
                <input className={`${style.text_input} ${style.green_input}`} type="text" />
                <input className={`${style.text_input} ${style.blue_input}`} type="text" />
            </div>
            <div className={style.game_buttons}>
                <button className={style.game_button}>Reset</button>
                <button className={style.game_button}>Submit</button>
            </div>
        </div>
    )
}

function RGBMode1() {

    const [colorDisplay, setColorDisplay] = useState(GenerateRandomColor());

    console.log(colorDisplay);

    function onNewGameClicked() {

        setColorDisplay(GenerateRandomColor());
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
                    <GuessWindow></GuessWindow>

                </div>
            </div>
        </div>
    )
}