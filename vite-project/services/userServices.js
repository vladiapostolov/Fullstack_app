let token = "";

const getToken= () => {
    return token;
}

const setToken = (toAdd) => {
    token = toAdd;
}

const logUser = async (username, password) => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body:JSON.stringify({ username, password })
    });

    if(!response.ok){
        throw new Error("Issue with login");
    }

    const data = await response.json();
    token = data.token;

    return {user: data.user, token };
}


export default {logUser, getToken, setToken};