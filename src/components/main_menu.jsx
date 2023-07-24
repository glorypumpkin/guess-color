'use client';

import style from './main_menu.module.css';
import { useState } from 'react';

export default function MainMenu({ onGameStart }) {
    const [showPickers, setShowPickers] = useState(false);
    const [colorMode, setColorMode] = useState(null);
    const [gameMode, setGameMode] = useState(null);

    function onColorModeClicked(mode) {
        //hide game mode picker if color mode is clicked again
        if (showPickers && colorMode === mode) {
            setColorMode(null);
        }
        else {
            setColorMode(mode);
        }
    }

    function onGameModeClicked(mode) {
        setGameMode(mode);
        onGameStart(colorMode, mode);
    }



    const pickGameMode = (
        <div>
            <button className={`${style.menu_buttons} ${style.modes}`} onClick={() => { onGameModeClicked('mode 1') }}>mode 1</button>
            <button className={`${style.menu_buttons} ${style.modes}`} onClick={() => { onGameModeClicked('mode 2') }}>mode 2</button>
        </div>
    )

    const pickColorMode = (
        <div>
            <button onClick={() => { onColorModeClicked('rgb') }} className={`${style.menu_buttons} ${style.colors}`}>RGB</button>
            {colorMode === 'rgb' && pickGameMode}
            <button onClick={() => { onColorModeClicked('hsl') }} className={`${style.menu_buttons} ${style.colors}`}>HSL</button>
            {colorMode === 'hsl' && pickGameMode}
        </div>
    )


    function onNewGameClicked() {
        //hide color mode picker if new game is clicked again
        if (showPickers) {
            setShowPickers(false);
        }
        else {
            setShowPickers(true);
        }
    }

    return (
        <div className={style.container}>
            <h1>Color Game</h1>
            <button onClick={onNewGameClicked} className={style.menu_buttons}>New Game</button>
            {/* {showColorModePicker && <ColorModePicker />} */}
            {showPickers && pickColorMode}
            <HowToPlay />
        </div>
    )
}

export function HowToPlay() {
    return (
        <div className={style.text_container}>
            <h2>How to play?</h2>
            <p>Click on the color that matches the RGB or HSL value shown above.</p>
        </div>
    )
}