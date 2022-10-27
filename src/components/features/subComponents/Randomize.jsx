import { useState } from "react";
import "./randomize.css"
import All from "../../all";
export default function Random({set, elements}) {
  const [enabled, enable] = useState(true)
  return (
    <>
    <hr />
      <raw className="margin-30">Randomize Questions</raw>
      <input type="checkbox" className="cwtitle form-check-input" onClick={e => {
        enable(!enabled)
      }}/>
      <hr />
   
      <div className={`options-${enabled} margin-30 trans`} id="options_div">
        Options:
        <br />
        Number of questions:
        <input type="number" disabled={enabled} id="Noq"/>
        <br /><br />
        <button className="btn btn-primary" disabled={enabled} onClick={e => {
            console.log(document.getElementById("Noq").value)
            All.getDataAsString(`cquiz?n=${
                document.getElementById("$input").value
              }&qs=${JSON.stringify(elements)}&mp=${
                document.getElementById("$mp").value
              }&r=1&qpm=${document.getElementById("Noq").value}`).catch()
              .then((r) => {
                set("Success");
              })
              .catch((r) => {
                setTimeout(() => {
                  set("Failed");
                }, 100);
              });
        }}>Create quiz with random questions</button>
        <br />
      </div>
    </>
  );
}
