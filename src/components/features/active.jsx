import Container from "../questions/QuestionContainer";
import { Link, useNavigate } from "react-router-dom";
import all from "../all";
import { useEffect, useState } from "react";
import QuizClient from "./quiz-client";
import Offcanvas from "../sorting/offcanvas";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { downloadCSVFromArray } from 'file-exporter';export default function ActiveQuizes({ allowDel = true, allowPrev = true }) {
  const [data, set] = useState([]);
  const [done, setDone] = useState("nd");
  const [cData, setData] = useState("Select a quiz to veiw its content");
  const [cName, setName] = useState("waiting...");
  const navigate = useNavigate();
  let index = 0;
  all.getDataAsString("gquizjson").then((r) => {
    r.text().then((txt) => {
      if (done === "nd") {
        set(JSON.parse(txt));
        setDone("dn");
      }
    });
  });
  return (
    <>
      <Container>
        {data.length ? (
          data.map((v) => {
            index += 1;
            return (
              <div
                className="alert-dark"
                style={{
                  backgroundColor: "gray",
                  padding: "5px",
                  borderRadius: "20px",
                  margin: "10px",
                }}
                id={"q-" + index}
              >
                {v.quiz_name}
                <AiFillEye
                  className="cwtitle widget cursor-pointer"
                  title="preview"
                  hidden={!allowPrev}
                  onClick={() => {
                    // (function () {

                    all
                      .getDataAsString(`getQuiz?qn=${v.quiz_name}`)
                      .then((r) => {
                        r.text().then((txt) => {
                          setData(JSON.parse(JSON.parse(txt)["questions"]));
                          setName(JSON.parse(txt)["quiz_name"]);
                        });
                      });
                  }}
                  data-bs-toggle={"offcanvas"}
                  href={allowPrev ? "#Preview" : "notallowed"}
                />
                <b
                  style={{
                    textAlign: "center",
                    margin: "10px",
                    color: "black",
                  }}
                  onClick={() => {
                    all
                      .getDataAsString(`getQuiz?qn=${v.quiz_name}`)
                      .then((r) => {
                        r.text().then((txt) => {
                          setData(JSON.parse(JSON.parse(txt)["questions"]));

                          setName(JSON.parse(txt)["quiz_name"]);

                          navigate(`/takequiz/${v.quiz_name}`);
                        });
                      });
                  }}
                >
                  Visit
                </b>
              </div>
            );
          })
        ) : (
          <b>
            There are no quizes, create one <Link to={"/quiz"}>here</Link>
          </b>
        )}
      </Container>
      <Offcanvas name="Preview" heading={"Preview"}>
        <QuizClient data={cData} isPrev={true} />
        <br />

        <Link to={`/takequiz/${cName}`}>
          <button data-bs-dismiss="offcanvas" className="btn btn-primary rmb-r">
            {" "}
            visit{" "}
          </button>
        </Link>
        <button className="rmb-l btn btn-primary" onClick={() => {
          all.getDataAsString(`export?qn=${cName}`).then(r => {
            r.text().then(r => {
              const data = JSON.parse(r)
              const output = []
              for (let i=0; i<data.length; i++) {
                const element = data[i]
                output.push({"Student name": element["name"], "Student's score": element["marks"]})
              }
              downloadCSVFromArray(output, `${cName}-attempts`)
            })
          })
        }}>Export data as .csv (All)</button>
        
        <RiDeleteBin2Line
          hidden={!allowDel}
          className="cursor-pointer bin widget"
          style={{ scale: "10px" }}
          title={"delete quiz"}
          onClick={() => {
            all.getDataAsString(`delQuiz?qn=${cName}`).then((r) => {
              window.location.reload()
            });
          }}
        />
      </Offcanvas>
    </>
  );
}
