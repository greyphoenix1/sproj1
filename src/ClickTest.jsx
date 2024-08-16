import React, {useState} from "react";

function ClickTest () {
    const [count, newCount] = useState(0);

    const handleAdd = () => {
        newCount(count + 1)
    }

    return(<>
    <h1>${count}</h1>
    <button onClick={handleAdd}>aaa</button>
    <h1>just test</h1></>)
}

export default ClickTest;