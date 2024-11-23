import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
            <h1 className="text-2xl text-white font-bold">Word Bomb 💣</h1>
            <div>
                <button 
                    className="px-4 py-1 bg-green-500 text-lg rounded hover:bg-green-600 cursor-pointer transition-colors"
                    onClick={() => navigate("/game")}
                >    
                    Play
                </button>
            </div>
        </div>
    )
}