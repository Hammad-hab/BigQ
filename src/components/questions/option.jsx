import { useState } from "react";

export default function Option({
  onMarkAnswer = () => {},
  onUnmarkAnswer = () => {},
  unmark = false,
  index = 0,
}) {
  const [isAnswer, markAnswer] = useState(false);
  const [value, set] = useState("Option");
  if (unmark === true) {
    markAnswer(false)
    set("Option")
  }
  return (
    <div id="option">
      <small>
        <div
          className={
            isAnswer
              ? "trn-all alert alert-success"
              : "trn-all alert alert-dark"
          }
        >
          <input
            value={value}
            id={`value-${index}`}
            onChange={(e) => {
              set(e.target.value);
              onMarkAnswer(document.getElementById("value-" + index).value);
            }}
            data-amians={String(isAnswer)}
          />
          <input
            type={"checkbox"}
            className="cwtitle form-check-input"
            title="mark as answer"
            onClick={() => {
              markAnswer(!isAnswer);
              if (!isAnswer) {
                console.log(value);
                onMarkAnswer(value);
              } else {
                onUnmarkAnswer();
              }
            }}
          />
        </div>
      </small>
    </div>
  );
}
