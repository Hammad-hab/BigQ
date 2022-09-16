import { useState } from "react";
import { FaGetPocket } from "react-icons/fa";
import All from "../all";
import Heading from "../message/heading";
import Popover from "../message/popup";
import Container from "../questions/QuestionContainer";
import Question from "../questions/questions";
import { CToolbar } from "../sorting/toolbar";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

export default function Random() {
  const [RandomQuestion, set] = useState([]);
  const [done, setDn] = useState("nd");
  const [show, setVisibility] = useState(false);
  const [limit, setLimit] = useState(1);
  return (
    <>
      <Heading text={"Random Question"} addSub={false} />
      <Container className="disable-text-selection">
        {RandomQuestion.length > 0 ? (
          RandomQuestion.map((v) => {
            return <Question question={v.q} answer={v.a}></Question>;
          })
        ) : (
          <p>
            Click <FaGetPocket /> to get the random questions
          </p>
        )}
      </Container>
      <CToolbar className="margin-30">
        <FaGetPocket
          title={"fetch random questions"}
          className={"widget cursor-pointer"}
          onClick={() => {
            setDn("nd");
            All.getDataAsString(`randomq?lm=${limit}`).then((r) => {
              r.text().then((txt) => {
                if (done === "nd") {
                  set(JSON.parse(txt));
                  setDn("dn");
                }
              });
            });
          }}
        />
        <MdOutlineProductionQuantityLimits
          className={"widget cursor-pointer"}
          onClick={() => setVisibility(true)}
          title={"set the number of questions"}
        />
        <Popover
          heading={"Set Question Amount"}
          body={
            <>
              <input
                type={"number"}
                min={1}
                id="limit"
                onChange={() =>
                  setLimit(document.getElementById("limit").value)
                }
              />
              <hr />
              <small>Initial limit: {limit}</small>
            </>
          }
          show={{ value: show, set: setVisibility }}
        />
      </CToolbar>
      <Link
        to={"/"}
        style={{ color: "black", textDecoration: "none" }}
        className="margin-30"
      >
        Back
      </Link>
    </>
  );
}
