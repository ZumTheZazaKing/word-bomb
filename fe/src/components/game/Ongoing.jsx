/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import wordExists from 'word-exists'

const Ongoing = (props) => {
    const { prompts } = props

    const [countdown,setCountdown] = useState(5)
    const [prompt, setPrompt] = useState("")
    const [input, setInput] = useState("")

    const inputRef = useRef(null)

    useEffect(() => {
        focusInput()
        getPrompt()
    },[])

    useEffect(() => {
        if(countdown <= 0)return
        setTimeout(() => {
            setCountdown(c => c-1)
        },1000)
    },[countdown])

    const getPrompt = () => {
        const prompt = prompts[Math.floor(Math.random() * prompts.length)]
        setPrompt(prompt)
    }

    const handleInputChange = e => {
        setInput(e.target.value.toUpperCase())
    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    const getHighlightedText = () => {
        const inputArr = input.split("");
        const promptArr = prompt.split("");
    
        let matchStartIndex = -1; // Tracks the starting index of a match
        let matchIndex = 0; // Tracks the current position in `prompt`
    
        return inputArr.map((letter, i) => {
          if (matchIndex < promptArr.length && letter === promptArr[matchIndex]) {
            if (matchStartIndex === -1) matchStartIndex = i; // Start match
            matchIndex++;
          } else if (matchIndex > 0 && letter !== promptArr[matchIndex]) {
            // Reset match if interrupted
            matchStartIndex = -1;
            matchIndex = 0;
          }
    
          // Highlight only if it's part of a valid contiguous match
          const isHighlighted = i >= matchStartIndex && i < matchStartIndex + matchIndex;
    
          return (
            <span key={i} className={isHighlighted ? "text-green-500" : ""}>
              {letter}
            </span>
          );
        });
    };

    const submitInput = () => {
        if(!wordExists(input))return
        setInput("")
        getPrompt()
    }
    (function(){
        let shouldHandleKeyDown = true;
        document.onkeydown = function(e){
          if (!shouldHandleKeyDown) return;
          shouldHandleKeyDown = false;

          if(e.key !== "Enter")return
          submitInput()
        }
        document.onkeyup = function(){
          shouldHandleKeyDown = true;
        }
    })();

    return (
        <div onClick={focusInput} className="w-screen h-screen flex flex-col gap-6 items-center justify-center">
            <div className="text-center space-y-2">
                <p className="text-white font-semibold text-4xl">{countdown}</p>
                <div className="text-white h-[36px] font-semibold text-3xl uppercase tracking-wider flex items-center justify-center">
                    {prompt ? prompt : <span className="animate-spin"><AiOutlineLoading3Quarters/></span>}
                </div>
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
                    className="h-0 w-0 bg-transparent font-semibold tracking-wide outline-none text-center text-white text-2xl"
                />
            </div>
        </div>
    )
};export default Ongoing