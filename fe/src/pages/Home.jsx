import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../Context";

export const Home = () => {

    const navigate = useNavigate();
    const { dispatch } = useContext(Context)

    const play = () => {
        dispatch({type:"fetch_prompts"})
        navigate("/game")
    }

    return (
        <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
            <h1 className="text-2xl text-white font-bold">Word Bomb 💣</h1>
            <div>
                <button 
                    className="px-4 py-1 bg-green-500 text-lg rounded hover:bg-green-600 cursor-pointer transition-colors"
                    onClick={play}
                >    
                    Play
                </button>
            </div>
        </div>
    )
}