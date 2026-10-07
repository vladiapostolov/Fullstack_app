import { useState } from "react"
import { useNavigate } from "react-router-dom";

const ToggleVisibility = (props) => {
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        if(!visible){
            navigate("/login");
        }else{
            navigate("/");
        }
        setVisible(!visible)
    }
    return (
        <>
            <div>
                {visible && props.children}
                {visible && <button onClick={handleClick}>cancel</button>}
                {!visible && <button onClick={handleClick} >log in </button>}
            </div>
        </>
    )
}

export default ToggleVisibility