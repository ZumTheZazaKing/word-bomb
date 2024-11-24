import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";

const End = () => {

    const { state, dispatch } = useContext(Context)
    const navigate = useNavigate()

    const [highest,setHighest] = useState(localStorage.getItem("zum-word-bomb-highest") || 0)
    const [newHigh,setNewHigh] = useState(false)

    useEffect(() => {
        if(state.score > highest){
            setHighest(state.score)
            localStorage.setItem('zum-word-bomb-highest', state.score)
            setNewHigh(true)
        }
    },[])

    const toMainMenu = () => {
        dispatch({ type: "exit_game" })
        navigate("/")
    }

    return (
        <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center text-white">
            <h2 className="text-2xl font-semibold ">GAME OVER</h2>
            <div className="text-center text-lg">
                {newHigh && <p className="text-yellow-500">NEW HIGHEST!</p>}
                <p>Score: {state.score}</p>
                <p>Highest Score: {highest}</p>
            </div>
            <div className="flex flex-col items-center gap-3">
                <button
                    onClick={() => dispatch({ type: "play_again" })}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                >
                    Play Again
                </button>
                <button onClick={toMainMenu}>
                    Main Menu
                </button>
            </div>
        </div>
    )
};export default End;