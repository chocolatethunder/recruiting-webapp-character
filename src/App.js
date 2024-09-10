import './App.css'
import SkillCheckResult from './components/SkillCheckResult'
import CharacterCard from './components/Character/CharacterCard'
import AddCharacterCard from './components/Character/AddCharacterCard'
import { useDispatch, useSelector } from 'react-redux'
import WarningModal from './components/WarningModal'
import { fetchGameData, resetGame } from './state/characterSlice'
import { SAVE_URL } from './consts'

function App() {
  const gameState = useSelector((state) => state.characters)
  const characters = useSelector((state) => state.characters.characters)
  const dispatch = useDispatch()

  const saveGame = async () => {
    await fetch(SAVE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameState),
    })
  }

  return (
    <div className="App">
      <header className={'fixed flex w-full bg-[#282c34] text-white p-1 gap-2'}>
        <h1 className={'text-4xl flex-grow '}>An RPG Game</h1>
        <button
          className={
            'w-[100px] justify-end text-black font-bold rounded-md bg-amber-100 cursor-pointer'
          }
          onClick={() => dispatch(fetchGameData())}
        >
          Load Last
        </button>
        <button
          className={
            'w-[75px] justify-end text-black font-bold rounded-md bg-amber-100 cursor-pointer'
          }
          onClick={saveGame}
        >
          Save
        </button>
        <button
          className={
            'w-[75px] justify-end text-black font-bold rounded-md bg-amber-100 cursor-pointer'
          }
          onClick={() => dispatch(resetGame())}
        >
          Reset
        </button>
      </header>
      <section className={'flex-1 text-white bg-[#1d2025] mt-12'}>
        <SkillCheckResult />
        <div className={'flex flex-row flex-wrap items-stretch'}>
          {characters.map((character, idx) => (
            <CharacterCard key={'key-' + idx} id={idx} />
          ))}
          <AddCharacterCard />
        </div>
      </section>
      <WarningModal />
    </div>
  )
}

export default App
