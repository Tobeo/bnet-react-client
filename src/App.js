import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Loader from "./Loader";
import BnetLanding from "./BnetLanding";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const checkExistingToken = useCallback(() => {
    if (document.cookie.includes('bnetToken')) {
        const token = document.cookie.split('bnetToken=')[1].split(';')[0];
        setUserContext((oldValues) => {
          return { ...oldValues, token: token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });

    }
}, [setUserContext]);

  useEffect(() => {
        checkExistingToken();
  }, [userContext.token]);

  return userContext.token === null ? (
    <BnetLanding/>
  ) : userContext.token ? (
    <BnetLanding/>
  ) : (
    <Loader />
  );
}

export default App;