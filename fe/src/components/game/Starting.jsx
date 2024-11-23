import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";

const Starting = () => {

    const { dispatch } = useContext(Context)
    const [countdown, setCountdown] = useState(3)

    useEffect(() => {
        if(countdown <= 0){
            dispatch({type:"start_game"})
            return
        }
        setTimeout(() => {
            setCountdown(c => c-1)
        },1000)
    },[countdown])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <p className="text-6xl text-white font-bold">{countdown}</p>
        </div>
    )
}
export default Starting;