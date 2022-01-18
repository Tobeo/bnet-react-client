import { Button } from "@blueprintjs/core";
const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';


const BnetLogoutButton = () => {

    const handleClick = () => {
            window.location.href = REACT_APP_API_ENDPOINT + "oauth/logout"
    }
    return (
        
            <Button
                icon="log-out"
                text="Logout"
                onClick={handleClick}
            />
    );
}

export default BnetLogoutButton;