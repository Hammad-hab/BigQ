import { useState } from "react";
import Input from "./input";

export default function Prompt(props) {
  const [isSubmited, set] = useState(false);
  const [disabled, setDisablity] = useState(false)
  const [value, setValue] = useState() 
  return (
    <>
      {isSubmited ? (
        <>
        <b className="margin-30">Name: <span id="name">{value}</span></b>
        {props.children}
        </>
      ) : (
        <div
          style={{ display: "grid", placeItems: "center", padding: "100px" }}
        >
          <Input
            ivalue="Student Anonymous"
            id={"name-input"}
            className={"is-invalid"}
            focus={true}
            onChange={(value) => {
                setValue(document.getElementById("name-input").value.trim())
                if (document.getElementById("name-input").value.trim()) {
                    setDisablity(false)
                  } else {
                    setDisablity(true)
                  }
            }}
          />
          <br />
          <br />
          <button
            className="btn btn-primary"
            disabled={disabled}
            onClick={() => {
              setValue(document.getElementById("name-input").value.trim())
              set(true)
            }}
          >
            Start Quiz
          </button>
        </div>
      )}
    </>
  );
}
