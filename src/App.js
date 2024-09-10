import './App.css'
import SkillCheckResult from './components/SkillCheckResult'
import CharacterCard from './components/Character/CharacterCard'
import AddCharacterCard from './components/Character/AddCharacterCard'
import { useSelector } from 'react-redux'

function App() {
  const characters = useSelector((state) => state.characters.characters)

  return (
    <div className="App">
      <header className={'bg-[#282c34] text-white p-1'}>
        <h1 className={'text-4xl'}>An RPG Game</h1>
      </header>
      <section className={'flex-1 text-white bg-[#1d2025]'}>
        <SkillCheckResult />
        <div className={'flex flex-row flex-wrap items-stretch'}>
          {characters.map((character, idx) => (
            <CharacterCard key={'key-' + idx} id={idx} />
          ))}
          <AddCharacterCard />
        </div>
      </section>
    </div>
  )
}

export default App
