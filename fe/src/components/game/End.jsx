import { useContext } from "react";
import { Context } from "../../Context";
import { useNavigate } from "react-router-dom";

const End = () => {

    const { state, dispatch } = useContext(Context)
    const navigate = useNavigate()

    const toMainMenu = () => {
        dispatch({ type: "exit_game" })
        navigate("/")
    }

    return (
        <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center text-white">
            <h2 className="text-2xl font-semibold ">GAME OVER</h2>
            <div>
                <p>Score: {state.score}</p>
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