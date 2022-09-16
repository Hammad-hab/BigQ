import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Offcanvas from "./offcanvas";
import All from "../all";
import Option from "../questions/option";
function Toolbar({ onSubmit, addons }) {
  const [options, option] = useState(["nw"]);
  const [disable, setRule] = useState(true);
  const [answer, set] = useState("NA");
  let i = -1;
  function addOption() {
    option([...options, "nw"]);
    console.log("Hello " + options);
  }
  function FetchOptions() {
    const Array = [];
    const Action = new Promise((r, rj) => {
      for (let i = 0; i < options.length; i++) {
        const Cvalue = document.getElementById("value-" + i);

        Array.push(Cvalue.value);
      }
      r();
    });

    Action.then(() => {
      option(["nw"]);
      document.getElementById("ques").value = "";
      setRule(true);
    });

    console.log(Array);
    return JSON.stringify(Array);
  }
  return (
    <div className="toolbar">
      <BsFillPlusCircleFill
        title="New question"
        className="addq"
        // onClick={() => set(true)}
        data-bs-toggle="offcanvas"
        href="#nq"
      />
      {addons}
      <Offcanvas heading={"New question"} name="nq">
        <>
          <raw>Question : </raw>
          <input
            id="ques"
            onChange={() =>
              document.getElementById("ques").value.trim().length > 0
                ? setRule(false)
                : setRule(true)
            }
          />
          <br />
          <br />
          <raw>Options: </raw>
          <div id="container">
            {options.map((v) => {
              i += 1;
              return (
                <Option
                  onMarkAnswer={(v) => {
                    set(v);
                  }}
                  index={i}
                />
              );
            })}
          </div>

          <p
            style={{ color: "blue", textAlign: "center" }}
            onClick={() => addOption()}
          >
            -New option-
          </p>

          <button
            disabled={disable}
            className={
              !disable ? "trn-all btn btn-primary" : "trn-all btn btn-danger"
            }
            onClick={() => {
              All.getDataAsString(
                `submitData?q=${
                  document.getElementById("ques").value
                }&a=${answer}&o=${FetchOptions()}`
              ).then((r) => {
                r.text().then((txt) => {
                  if (txt === "Done") {
                    console.log("Success");
                  }
                });
              });
              onSubmit();
            }}
          >
            Ok
          </button>
        </>
      </Offcanvas>
    </div>
  );
}

export default Toolbar;

export function CToolbar(props) {
  return <div className={"toolbar " + props.className}>{props.children}</div>;
}
