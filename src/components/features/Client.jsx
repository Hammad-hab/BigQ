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
        setData(JSON.parse(JSON.parse(string)["questions"]));
        setMP(JSON.parse(string)["mp"]);
        setDone("dn")
      }
    });
  });

  return (
    <>
      <Heading text={quizdata} addSub={false} />
      <QuizClient data={data} mp={MP} qname={quizdata} />
    </>
  );
}
