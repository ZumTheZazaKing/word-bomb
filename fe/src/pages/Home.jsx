export const Home = () => {
    return (
        <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
            <h1 className="text-2xl text-white">Word Bomb 💣</h1>
            <div>
                <button className="px-4 py-1 bg-green-500 text-lg rounded hover:bg-green-600 cursor-pointer transition-colors">Play</button>
            </div>
        </div>
    )
}