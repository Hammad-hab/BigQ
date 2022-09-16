import All from "../all";
import { useState } from "react";
import AttemptableQuestion from "./subComponents/attemptable-question";
import all from "../all";
import Prompt from "./subComponents/nameprompt";
export default function QuizClient({ data, isPrev = false, mp = 0, qname }) {
  const [answers, set] = useState([]);
  const [isSubmited, setVl] = useState(false);
  var [marks, setMarks] = useState(0);
  const mpRatio = mp;

  let index = 0;
  return (
    <Prompt>
      {!isSubmited ? (
        data !== "Select a quiz to veiw its content" ? (
          data.length > 0 ? (
            data.map((vl) => {
              const Data = JSON.parse(vl.opts);
              console.log("done");
              index += 1;

              return (
                <AttemptableQuestion
                  vl={vl}
                  Data={Data}
                  index={index}
                  state={{ state: answers, setSt: set }}
                />
              );
            })
          ) : (
            <b>No data to display</b>
          )
        ) : (
          <b>Select a quiz to veiw its content</b>
        )
      ) : (
        ""
      )}
      {!isSubmited ? (
        <button
          className="btn btn-primary margin-30"
          disabled={isPrev}
          onClick={() => {
            setVl(true);
            for (let i = 0; i < answers.length + 1; i++) {
              const element = answers[i];
              console.log(mpRatio);
              if (element === "R") {
                setMarks((marks += mpRatio));

                console.log(mpRatio);
              } else if (element === "W") {
                continue;
              }
            }
            all.getDataAsString(
              `/uploadA?qn=${qname}&un=${document
                .getElementById("name")
                .innerText.trim()}&sr=${marks}`
            );
          }}
        >
          Submit
        </button>
      ) : (
        <h1>Your Score</h1>
      )}
      <br />
      {isSubmited ? (
        <h3 className="margin-30" style={{ color: "gray" }}>
          {marks}
        </h3>
      ) : (
        ""
      )}
      {isPrev ? (
        <small style={{ color: "red" }}>
          Submitting the test is not allowed in preview
        </small>
      ) : (
        ""
      )}
    </Prompt>
  );
}
