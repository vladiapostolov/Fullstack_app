import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUsername, useLoginPassword, useLoginActions } from "../src/login-store";
import { useUserActions } from "../src/user-store";

const LoginPage = () => {
    const [error, setError] = useState("");
    const username = useLoginUsername();
    const password = useLoginPassword();
    const { handleUsername, handlePassword, reset } = useLoginActions();
    const { sendUserData } = useUserActions();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendUserData(username, password)
            .then(() => reset())
            .then(() => navigate("/home"))
            .catch(error => setError(error));
    }

    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    username
                    <input type="text" value={username} onChange={handleUsername}></input>
                </label>
                <br/>
                <label>
                    password
                    <input type="text" value={password} onChange={handlePassword}></input>
                </label>
                <br/>
                <button>submit</button>
            </form>
        </>
    )
}

export default LoginPage;
