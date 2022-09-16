import { RiDeleteBin2Line } from "react-icons/ri";
import All from "../all.js";
import { FaSave } from "react-icons/fa";
import { useState } from "react";

function Question({ question, answer, index }) {
  const [selected, select] = useState(false);
  const [status, change] = useState("saved");
  window.onbeforeunload = () => {
    // ensuring if all the questions are saved
    if (status === "unsaved") return false;
  };
  return (
    <div
      className={
        selected !== false ? "alert alert-dark selected" : "alert alert-dark"
      }
      id={index}
    >
      <small
        className="badge me-auto cwtitle"
        style={{ color: status == "saved" ? "green" : "red" }}
        title={
          status === "saved"
            ? "All changes are saved, if you reload the tab no data will be lost."
            : "Data is not saved. If you reload the tab all changes will be lost."
        }
      >
        {status}
      </small>
      <span id={"s-" + index} onDoubleClick={() => select(!selected)}>
        {" "}
        <p>
          Question:{" "}
          <span
            contentEditable
            id={"q-" + index}
            data-Qprev={question}
            onSelect={(e) => {
              const NewQ = document.getElementById("q-" + index).innerText;
              const NewA = document.getElementById("a-" + index).innerText;

              const prvQ = document
                .getElementById("q-" + index)
                .getAttribute("data-Qprev");
              const prvA = document
                .getElementById("a-" + index)
                .getAttribute("data-Aprev");
              if (NewQ.trim() != prvQ || NewA.trim() != prvA) {
                change("unsaved");
              } else {
                change("saved");
              }
            }}
          >
            {question}
          </span>
          {question.trim().endsWith("?") ? (
            ""
          ) : (
            <b title="auto-inserted character">?</b>
          )}
        </p>
        <p>
          Answer:{" "}
          <span
            contentEditable
            id={"a-" + index}
            data-Aprev={answer}
            onSelect={(e) => {
              const NewQ = document.getElementById("q-" + index).innerText;
              const NewA = document.getElementById("a-" + index).innerText;

              const prvQ = document
                .getElementById("q-" + index)
                .getAttribute("data-Qprev");
              const prvA = document
                .getElementById("a-" + index)
                .getAttribute("data-Aprev");
              if (NewQ.trim() != prvQ || NewA.trim() != prvA) {
                change("unsaved");
              } else {
                change("saved");
              }
            }}
          >
            {answer}
          </span>
        </p>
      </span>
      <span id="tools" hidden={!selected}>
        <hr />
        <RiDeleteBin2Line
          className="cursor-pointer bin"
          title={"delete question"}
          onClick={() => {
            All.getDataAsString(`remove?q=${question}&a=${answer}`).then(
              (r) => {
                document.getElementById(String(index)).remove();
              }
            );
          }}
        />
        <FaSave
          className="widget"
          title={"save all edits"}
          onClick={() => {
            console.log("attempting edit");
            const question = document.getElementById("q-" + index).innerText;
            const answer = document.getElementById("a-" + index).innerText;
            All.getDataAsString(
              `edit?q=${question}&a=${answer}&i=${index}`
            ).then((r) => {
              console.log("Successfully edited " + index);
              change("saved");
            });
          }}
        />
      </span>
    </div>
  );
}
export default Question;
