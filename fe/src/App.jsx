import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useMemo, useReducer } from 'react'
import Loader from './components/Loader'
import { Context } from './Context'

const Home = lazy(() => import('./pages/Home').then(module => ({default:module.Home})))
const Game = lazy(() => import('./pages/Game').then(module => ({default:module.Game})))

function App() {

  const initalGameState = {
    score: 0,
    start:false,
    state:"Waiting"
  }

  const reducer = (state,action) => {
    switch(action.type){
      case 'fetch_prompts':
        return {...state, state: "Fetching"}
      
      case 'enter_game':
        return {...state, state: "Starting"}

      case 'start_game':
        return {...state, start:true, state:"Ongoing"}
      
      case 'end_game':
        return {...state, start:false, state:"End"}
      
      case 'exit_game':
        return {...state, state:"Waiting"}
      
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initalGameState)

  const memo = useMemo(() => ({
    state, dispatch
  }),[state])

  return (
    <Router>
      <Context.Provider value={memo}>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </Context.Provider>
    </Router>
  )
}

export default App
