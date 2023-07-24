import style from './game.module.css';

export default function Game({ gameConfig }) {
    console.log(gameConfig);
    if (gameConfig.color === 'rgb' && gameConfig.mode === 'mode 1') {
        return <RGBMode1 />
    }
    else {
        return <p>to be done...</p>
    }
}

function RGBMode1() {
    return (
        <div className={style.container}>
            <h1>RGB Mode 1</h1>
            <div className={style.game_container}>
                <div className={style.color_container}>
                    <div className={style.square}></div>
                </div>
                <div className={style.guesses_container}>
                    <div className={style.guess}></div>
                    <div className={style.guess}></div>
                    <div className={style.guess}></div>
                    <div className={style.guess}></div>
                    <div className={style.guess}></div>
                </div>
            </div>
        </div>
    )
}