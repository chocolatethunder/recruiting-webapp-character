import './App.css'
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js'
import SkillCheckResult from './components/SkillCheckResult'
import CharacterCard from './components/Character/CharacterCard'
import AddCharacterCard from './components/Character/AddCharacterCard'

function App() {
  return (
    <div className="App">
      <header className={'bg-[#282c34] text-white p-1'}>
        <h1 className={'text-4xl'}>An RPG Game</h1>
      </header>
      <section className={'flex-1 text-white bg-[#1d2025]'}>
        <SkillCheckResult />
        <div className={'flex flex-row items-stretch'}>
          <CharacterCard id={1} />
          <AddCharacterCard />
        </div>
      </section>
    </div>
  )
}

export default App
