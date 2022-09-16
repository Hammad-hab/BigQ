import { useState } from "react";

import { Link } from "react-router-dom";
import Heading from "../message/heading";
export default function Password(props) {
  const [iscorrect, set] = useState(
    sessionStorage.getItem("signedin")
      ? Boolean(sessionStorage.getItem("signedin"))
      : false
  );
  return (
    <>
      {iscorrect ? (
        props.children
      ) : (
        <>
          <Heading
            text={"Welcome to BigQ. Please Sign In to gain futher access"}
            addSub={false}
          ></Heading>
          <div
            style={{ display: "grid", placeItems: "center", padding: "100px" }}
          >
            Password
            <input
              type={"password"}
              style={{ border: "3px inset" }}
              onChange={(e) => {
                if (e.target.value === "biscuitstyle1234") {
                  set(true);
                  sessionStorage.setItem("signedin", true);
                } else {
                  set(false);
                }
              }}
            />
          </div>
          <Link to={"/veiw"} style={{ color: "black" }} className={"margin-30"}>
            I am here to take a quiz
          </Link>
          
        </>
      )}
    </>
  );
}
