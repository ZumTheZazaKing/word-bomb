import { useContext } from "react"
import { Context } from "../Context"

import Starting from "../components/game/Starting"
import Ongoing from "../components/game/Ongoing"

export const Game = () => {

    const { state } = useContext(Context)

    return (
        <>
            {state.state === "Starting" && !state.start && <Starting/>}
            {state.state === "Ongoing" && state.start && <Ongoing/>}
        </>
    )
}