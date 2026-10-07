import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {
    Link
} from 'react-router-dom';

import { useUsername } from '../src/user-store'
import { useId } from '../src/user-store'

const Home = () => {
    const navigate = useNavigate();
    const username = useUsername();
    const id = useId();

    useEffect(() => {
        if(!username){
            navigate("/login");
        }

    }, [username, navigate]);

    return (
        <>
        <Link to="/notes">notes</Link>
        <Link to="/login">logout</Link>
        <p>Welcome, {username} with ID: {id}!</p>
        </>
    )
}

export default Home
