import { useState } from "react";

const useCounter = ()=>{

    const [counter,setCounter] = useState(0);

    const onIncreamentCounter = ()=>{

        setCounter(counter + 1);
    }

    const onDecreamentCounter = ()=>{

        setCounter(counter - 1);
    }

    return[counter,onIncreamentCounter,onDecreamentCounter];
}
export default useCounter;