import { useEffect, useState } from 'react'
import ScreenPokemones from './components/ScreenPokemones.jsx'
import ScreenFight from './components/ScreenFight.jsx'
import Win from './components/Win.jsx'
import GameOver from './components/GameOver.jsx'
import './App.css'

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [position, setPosition] = useState(0);
  const [myPokeSelection, setMyPokeSelection] = useState([]);
  const [computerPokeSelection, setComputerPokeSelection] = useState([]);
  const [screenLayout, setScreenLayout] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const randomDamage = () => Math.floor(Math.random() * 30)

  const pokeUrl = 'https://pokeapi.co/api/v2/pokemon'

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const pokemondata = async (pokeUrl) => {
    const response = await fetchData(pokeUrl);

    const dataPromises = response.results.map((poke) => (
      fetchData(poke.url)
    ));

    const pokemonWithImages = await Promise.all(dataPromises);
    setPokemones(pokemonWithImages);
  }

  const handleSelection = (n) => {
    if (position + n < 0 || position + n >= pokemones.length || screenLayout != 0) {
      return;
    } else {
      setPosition(position + n);
    }
  }

  const filterSelection = () => {
    if (screenLayout === 1) {
      return;
    }
    const mySelection = pokemones.filter((value, idx) => position === idx)
    setMyPokeSelection(mySelection)

    computerSelection();
  }

  const computerSelection = () => {
    const computerPos = Math.floor(Math.random() * pokemones.length);
    const computerSelection = pokemones.filter((value, idx) => computerPos === idx)
    setComputerPokeSelection(computerSelection)
    setEnemyHealth(100)
    setPlayerHealth(100)
  }

  const startFight = () => {
    if (myPokeSelection.length === 0) {
      return;
    } else if (myPokeSelection.length > 0 && screenLayout != 0) {
      setScreenLayout(0);
    } else {
      setScreenLayout(1);
    }
  }

  const attack = async () => {
    if (screenLayout != 1) {
      return;
    }
    const damagePlayer = randomDamage()
    const damageEnemy = randomDamage()
    const reset = () => {
      setPosition(0)
      setEnemyHealth(100)
      setPlayerHealth(100)
    }

    if (enemyHealth - damagePlayer <= 0) {
      setScreenLayout(2)
      reset()
      return;
    } else if (playerHealth - damageEnemy <= 0) {
      setScreenLayout(3)
      reset()
      return;
    }
    setEnemyHealth(enemyHealth - damagePlayer)
    await sleep(1000)
    setPlayerHealth(playerHealth - damageEnemy)
  }

  useEffect(() => {
    pokemondata(pokeUrl);
  })

  return (
    <>
      <div>
        <div className='main-container'>
          <h1>Pokédex</h1>
          <div className='layout-game'>
            <div className='container-screen'>
              <div className='screen-layout'>
                {
                  screenLayout === 0 ? <ScreenPokemones pokemones={pokemones} position={position} /> :
                  screenLayout === 1 ? <ScreenFight player={myPokeSelection} enemy={computerPokeSelection} playerHealth={playerHealth} enemyHealth={enemyHealth} /> :
                  screenLayout === 2 ? <Win /> :
                  screenLayout === 3 ? <GameOver /> :
                  null
                }
              </div>
            </div>

            <div className='buttons-container'>
              <div className='container-pad'>
                <button className='left-pad' onClick={() => handleSelection(-1)}></button>
                <div className='container-updown-button'>
                  <button className='up-pad' onClick={() => handleSelection(-3)}></button>
                  <button className='down-pad' onClick={() => handleSelection(3)}></button>
                </div>
                <button className='right-pad' onClick={() => handleSelection(1)}></button>
              </div>

              <div className='container-select'>
                <div className='button-select-container'>
                  <button className='button-select' onClick={() => filterSelection()}></button>
                  <p className='word'>select</p>
                </div>
                <div className='button-start-container'>
                  <button className='button-start' onClick={() => startFight()}></button>
                  <p className='word'>start</p>
                </div>
              </div>

              <div className='container-action'>
                <div className='button-b-container'>
                  <button className='button-b'></button>
                  <p className='word'>B</p>
                </div>
                <div className='button-a-container'>
                  <button className='button-a' onClick={() => attack()}></button>
                  <p className='word'>A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
