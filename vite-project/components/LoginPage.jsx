const LoginPage = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <label>
                    username
                    <input type="text" value={props.username} onChange={props.handleUsername}></input>
                </label>
                <br/>
                <label>
                    password
                    <input type="text" value={props.password} onChange={props.handlePassword}></input>
                </label>
                <br/>
                <button>submit</button>
            </form>
        </>
    )
}

export default LoginPage;