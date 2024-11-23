import { useEffect, useRef, useState } from "react";

const Ongoing  = () => {

    const [countdown,setCountdown] = useState(5)
    const [prompt, setPrompt] = useState("TES")
    const [input, setInput] = useState("")

    const inputRef = useRef(null)

    useEffect(() => {
        focusInput()
    },[])

    useEffect(() => {
        if(countdown <= 0)return
        setTimeout(() => {
            setCountdown(c => c-1)
        },1000)
    },[countdown])

    const handleInputChange = e => {
        setInput(e.target.value.toUpperCase())
    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    const getHighlightedText = () => {
        let remainingPrompt = prompt;
        return input.split("").map((letter, i) => {
          const isMatch = remainingPrompt.startsWith(letter);
          if (isMatch) {
            remainingPrompt = remainingPrompt.slice(1); // Remove matched letter
            return (
              <span key={i} className="text-green-400">
                {letter}
              </span>
            );
          }
          return <span key={i}>{letter}</span>;
        });
    };

    return (
        <div onClick={focusInput} className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
            <div className="text-center space-y-2">
                <p className="text-white font-semibold text-4xl">{countdown}</p>
                <div className="text-white font-semibold text-3xl uppercase tracking-wider">{prompt}</div>
            </div>
            <p className="w-screen bg-transparent font-semibold tracking-wide outline-none text-center text-white text-2xl uppercase">
                {getHighlightedText()}
                <span className="animate-blink">&#9474;</span>
            </p>
            <div>
                <input type="text"
                    ref={inputRef}
                    value={input}
                    onChange={e => handleInputChange(e)}
                    className="h-0 w-0 w-screen bg-transparent font-semibold tracking-wide outline-none text-center text-white text-2xl"
                />
            </div>
        </div>
    )
};export default Ongoing