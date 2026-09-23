import { useState } from "react"

const ToggleVisibility = (props) => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(!visible)
    }
    return (
        <>
            <div>
                {visible && props.children}
                {visible && <button onClick={handleClick}>cancel</button>}
                {!visible && <button onClick={handleClick}>log in </button>}
            </div>
        </>
    )
}

export default ToggleVisibility