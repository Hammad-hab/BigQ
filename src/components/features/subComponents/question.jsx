import { useState } from "react";

export default function Question({
  value,
  onSelect = () => {},
  onUnSelect = () => {},
  index,
}) {
  const [isChecked, set] = useState(false);
  return (
    <>
      <div className="alert alert-secondary" data-id={index}>
        <input
          type={"checkbox"}
          className={"cwtitle form-check-input"}
          onClick={(e) => {
            set(!isChecked);
            if (!isChecked) {
              onSelect(isChecked, value);
            } else {
              onUnSelect(index);
            }
          }}
        />
        <b>Question:</b> {value.q}
        <br />
        <b>Answer:</b> {value.a}
        <br />
        <b>Options:</b>
        <br />
        <ul>
          { value.opts ?
          JSON.parse(value.opts).map((v) => {
            return (
              <li>
                <small>{v}</small>
                <br />
              </li>
            );
          }): ""}
        </ul>
      </div>
    </>
  );
}
