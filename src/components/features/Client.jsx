import { useState } from "react";
import { useParams } from "react-router";
import all from "../all";
import QuizClient from "./quiz-client";
import Heading from "../message/heading";
export default function Client() {
  const { quizdata } = useParams();
  const [data, setData] = useState("Select a quiz to veiw its content");
  const [MP, setMP] = useState(0);
  const [done, setDone] = useState("nd");
  all.getDataAsString(`getQuiz?qn=${quizdata}`).then((r) => {
    r.text().then((string) => {
      if (done === "nd") {
        try {
          setData(JSON.parse(JSON.parse(string)["questions"]));
          setMP(JSON.parse(string)["mp"]);
          
        } catch {
          setData("Not found");
        }
        setDone("dn");
      }
    });
  });

  return (
    <>
      {data != "Not found" ? (
        <>
          <Heading text={quizdata} addSub={false} />
          <QuizClient data={data} mp={MP} qname={quizdata} />
        </>
      ) : (
        <>
          <h1 className="margin-30">404<sub> Not Found</sub></h1>
          <hr/>
          <h5 className="margin-30">We couldn't find the quiz you were looking for</h5>
        </>
      )}
    </>
  );
}
