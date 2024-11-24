/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import getGroqChatCompletion from "../../hooks/getGroqChatCompletion";
import { Context } from "../../Context";

const Fetching = (props) => {

    const { dispatch } = useContext(Context)
    const { setPrompts } = props

    useEffect(() => {
        getPrompts()
    },[])

    const getPrompts = async() => {
        try{
            const res = await getGroqChatCompletion()
            const prompts = JSON.parse(res.choices[0].message.content)

            if (prompts.length < 50)return getPrompts()

            console.log(prompts)
            setPrompts(prompts)
            dispatch({type:"enter_game"})

        }catch(e){
            console.log(e)
            getPrompts()
        }
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-3 text-white text-xl">
            <p>Fetching Resources...</p>

        </div>
    )
};export default Fetching