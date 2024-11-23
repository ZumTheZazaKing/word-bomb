import { useEffect, useContext, useState } from "react"
import { Context } from "../Context"

import Starting from "../components/game/Starting"
import Ongoing from "../components/game/Ongoing"

export const Game = () => {

    const { state, dispatch } = useContext(Context)


    return (
        <>
            {state.state === "Starting" && !state.start && <Starting/>}
            {state.state === "Ongoing" && state.start && <Ongoing/>}
        </>
    )
}