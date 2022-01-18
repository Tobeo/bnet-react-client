import { Button } from "@blueprintjs/core";
const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';


const BnetLoginButton = () => {

    const handleClick = () => {
            window.location.href = REACT_APP_API_ENDPOINT + 'oauth/battlenet'
    }
    return (
        
            <Button
                icon="log-in"
                text="Login with Bnet"
                onClick={handleClick}
            />
    );
}

export default BnetLoginButton;