import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"

import Starting from "../components/game/Starting"
import Ongoing from "../components/game/Ongoing"
import Fetching from "../components/game/Fetching"
import { useNavigate } from "react-router-dom"

export const Game = () => {

    const { state } = useContext(Context)
    const navigate = useNavigate()
    const [prompts, setPrompts] = useState([])

    useEffect(() => {
        if (state.state !== "Waiting")return
        navigate("/")
    },[])

    return (
        <>
            {state.state === "Fetching" && !state.start && <Fetching setPrompts={setPrompts}/>}
            {state.state === "Starting" && !state.start && <Starting/>}
            {state.state === "Ongoing" && state.start && <Ongoing prompts={prompts}/>}
        </>
    )
}