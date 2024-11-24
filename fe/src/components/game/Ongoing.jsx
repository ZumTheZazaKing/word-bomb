/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import wordExists from 'word-exists'
import { Context } from "../../Context";

const Ongoing = (props) => {
    const { prompts } = props
    const { state, dispatch } = useContext(Context)

    const [countdown,setCountdown] = useState(10)
    const [prompt, setPrompt] = useState("")
    const [input, setInput] = useState("")

    const inputRef = useRef(null)
    const displayRef = useRef(null)

    useEffect(() => {
        focusInput()
        getPrompt()
    },[])

    useEffect(() => {
        const timer = setInterval(() => {
          setCountdown((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);
    
    const addTime = (seconds) => {
        setCountdown((prevTime) => prevTime + seconds);
    };
    

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

    const shakeInput = () => {
        displayRef.current.classList.add('animate-shake')
        setTimeout(() => {
            displayRef.current.classList.remove('animate-shake')
        },200)
    }

    const submitInput = () => {
        if(!wordExists(input))return shakeInput()
        if(!input.includes(prompt))return shakeInput()
        dispatch({type:"add_score", payload:1})

        addTime(3)

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
            <div className="absolute top-0 text-center w-screen px-4 py-2 bg-[rgba(0,0,0,0.3)]">
                <p className="text-white font-semibold text-2xl">
                    {state.score}
                </p>
            </div>
            <div className="text-center space-y-2">
                <p className="text-white font-semibold text-4xl">{countdown}</p>
                <div className="text-white h-[36px] font-semibold text-3xl uppercase tracking-wider flex items-center justify-center">
                    {prompt ? prompt : <span className="animate-spin"><AiOutlineLoading3Quarters/></span>}
                </div>
            </div>
            <p 
                ref={displayRef}
                className="w-screen bg-transparent font-semibold tracking-wide outline-none text-center text-white text-2xl uppercase line-clamp-1"
            >
                {getHighlightedText()}
            </p>
            <div className="absolute bottom-0 p-4 bg-[rgba(0,0,0,0.3)] w-screen text-center">
                <input type="text"
                    ref={inputRef}
                    value={input}
                    onChange={e => handleInputChange(e)}
                    className="w-full bg-transparent tracking-wide outline-none text-center text-white text-2xl"
                />
            </div>
        </div>
    )
};export default Ongoing