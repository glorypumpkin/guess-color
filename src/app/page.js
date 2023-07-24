'use client'

import Image from 'next/image'
import styles from './page.module.css'
import MainMenu from '@/components/main_menu'
import Game from '@/components/game'
import { useState } from 'react'

export default function Home() {
  const [activePage, setActivePage] = useState('menu')

  const [gameConfig, setGameConfig] = useState(null)

  function onGameStart(color, mode) {
    setActivePage('game')
    console.log(color, mode)
    setGameConfig({
      color: color,
      mode: mode
    })
  }

  if (activePage === 'menu') {
    return (
      <div className={styles.container} >
        <MainMenu onGameStart={onGameStart} />
      </div>
    )
  }
  else {
    return (
      <div className={styles.container}>
        <Game gameConfig={gameConfig} />
      </div>
    )
  }
}
