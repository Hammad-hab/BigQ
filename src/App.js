/* Importing modules */

import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import All from "./components/all";
import { useState } from "react";
import Error from "./components/errorboundary";
import { AiOutlineReload } from "react-icons/ai";
import { HiFolderRemove } from "react-icons/hi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GiCardRandom } from "react-icons/gi";
import Container from "./components/questions/QuestionContainer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Random from "./components/features/random";
import Heading from "./components/message/heading";
import Quiz from "./components/features/quiz";
import { GrNewWindow } from "react-icons/gr";
import { MdViewList } from "react-icons/md";
import ActiveQuizes from "./components/features/active";
import Password from "./components/authentication/password";
import Client from "./components/features/Client";

export function App() {
  const [done, setDone] = useState("nd");
  const [questions, set] = useState([]);
  const [error, setError] = useState(false);

  function loadQuestions() {
    All.getDataAsString("json")
      .then((res) => {
        res.text().then((res) => {
          if (res.length > 0 && done == "nd") {
            res = JSON.parse(res)["questions"];
            for (var i = 0; i < res.length; i++) {
              const element = res[i];
              element.index = i;
              questions[i] = element;
            }
            set(questions);
            setDone("dn");
          } else {
            console.log("Program denied permission");
          }
        });
      })
      .catch((e) => {
        setError(true);
      });
    console.log("loading results");
  }
  /* Loading questions */
  loadQuestions();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/active"
            element={
              <Password>
                <ActiveQuizes />
              </Password>
            }
          />
          <Route
            path="/veiw"
            element={<ActiveQuizes allowDel={false} allowPrev={false} />}
          />
          <Route
            path="/quiz"
            element={
              <Password>
                <Quiz />
              </Password>
            }
          />
          <Route path="/takequiz/:quizdata" element={<Client />} />
          <Route
            path="/"
            element={
              <Password>
                {" "}
                <small>v1.0.1</small>
                <Heading text={"BigQ"} />
                <All.Toolbar
                  onSubmit={() => {
                    setDone("nd");
                    loadQuestions();
                    console.log(questions);
                  }}
                  addons={
                    <>
                      <AiOutlineReload
                        className="cursor-pointer widget"
                        title={"Manual Reload"}
                        onClick={() => {
                          setDone("nd");
                          loadQuestions();
                        }}
                      />
                      <HiFolderRemove
                        title={"Remove all"}
                        className={"widget cursor-pointer"}
                        onClick={() => {
                          All.getDataAsString(`removeall`).then((r) => {
                            document.getElementById("holder").innerHTML =
                              "<p>Removed all questions<p>";
                            loadQuestions();
                          });
                        }}
                      />
                      <Link to={"/quiz"}>
                        <GrNewWindow
                          className="widget cursor-pointer"
                          title="Create Quiz"
                        />
                      </Link>

                      <Link to={"/active"}>
                        <MdViewList
                          className="widget cursor-pointer"
                          style={{ color: "black" }}
                          title={"veiw active quizes"}
                        />
                      </Link>
                    </>
                  }
                />
                <Container>
                  {questions.length > 0 ? (
                    questions.map((v) => {
                      return (
                        <All.Question
                          question={v.q}
                          answer={v.a}
                          index={v.index}
                        ></All.Question>
                      );
                    })
                  ) : error === true ? (
                    <div className="alert alert-danger">
                      An error occured while trying to fetch your questions from
                      the server, kindly check your internet connection and if
                      that does not work please restart the application.
                    </div>
                  ) : (
                    <p>
                      No questions, use <BsFillPlusCircleFill /> to add a
                      question.
                    </p>
                  )}
                </Container>
              </Password>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

render(
  <Error>
    <App />
  </Error>,
  document.getElementById("root")
);
