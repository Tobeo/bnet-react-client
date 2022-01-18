import { Spinner } from "@blueprintjs/core"
import {useState, useEffect} from 'react';
import React from "react"

const Loader = (props) => {
  const [message, setMessage] = useState(props.message);

  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);

  return (
    <div className="loader">
      <Spinner size={50} />
      {message? <p className="loaderMessage">{message}</p>: null}
    </div>
  )
}

export default Loader