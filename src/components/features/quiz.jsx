import All from "../all";
import Container from "../questions/QuestionContainer";
import Question from "./subComponents/question";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "./subComponents/input";
import {IoCreateOutline} from "react-icons/io5"

export default function Quiz() {
  const [data, setData] = useState([]);
  const [elements, element] = useState([]);
  const [done, setDone] = useState("nd");
  const [Status, set] = useState();
  const nav = useNavigate();
  const MP = 1
  var i = -1;
  All.getDataAsString("all").then((r) => {
    if (done === "nd") {
      r.text().then((r) => {
        r = JSON.parse(r);

        setData(r);
        setDone("dn");
        console.log(data)
      });
    }
  });

  return (
    <>
      <span className={"margin-20"}>
        Name:
        <Input ivalue="Some name" id={"$input"}/>,

        Marks per question:
        <Input ivalue="1" type={"number"} id={"$mp"}/>
      </span>

      <Container>
        <small>The answer you tick will be used in the quiz</small>
        <hr />
        {data.length > 0
          ? data.map((v) => {
              i += 1;
              console.log("Damn  " + JSON.stringify(v))
              return (
                <Question
                  value={v}
                  index={i}
                  onSelect={(state, vl) => {
                    elements.push(vl);
                    console.log(elements.length);
                    element(elements);
                    console.log(elements);
                  }}
                  onUnSelect={(ind) => {
                    element(All.remove(elements, ind));
                    console.log(
                      "Unselect " + JSON.stringify(All.remove(elements, ind))
                    );
                  }}
                />
              );
            })
          : "Not Available"}
      </Container>
      <div className="toolbar">
      <IoCreateOutline className="widget cursor-pointer" title="create quiz with random questions"/>
      </div>
      <button
        className="btn btn-primary margin-30"
        onClick={() => {
          set("");
          All.getDataAsString(
            `cquiz?n=${
              document.getElementById("$input").value
            }&qs=${JSON.stringify(elements)}&mp=${document.getElementById("$mp").value}`
          )
            .catch()
            .then((r) => {
              set("Success");
            })
            .catch((r) => {
              setTimeout(() => {
                set("Failed");
              }, 100);
            });
        }}
      >
        Create new Quiz
      </button>
      {Status ? (
        Status === "Failed" ? (
          <div className="alert alert-danger">
            Failed to create the quiz please try again.
          </div>
        ) : (
          <div className="alert alert-success">
            Successfully created a quiz. Redirecting in 2s{" "}
            {void setTimeout(() => nav("/"), 2000)}
          </div>
        )
      ) : (
        <small>Waiting...</small>
      )}
      
    </>
  );
}
