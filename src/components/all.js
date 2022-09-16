import Question from "./questions/questions";
import Toolbar from "./sorting/toolbar";
import Popover from "./message/popup";
import axios from "axios";
function getDataAsString(url) {
  let done = false;
  if (done === false) {
    const res = axios.get("https://server-python-py.herokuapp.com/" + url);

    return new Promise((r) => {
      res.then((rj) => {
        r({
          text: function () {
            return new Promise((rjj) => {
              rjj(JSON.stringify(rj.data));
            });
          },
        });
      });
    });
  }
}
function remove(array, index) {
  const __index__ = index;
  const NArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (i === __index__) {
      continue;
    } else {
      NArray.push(element);
    }
  }
  return NArray;
}
export default { Question, Popover, Toolbar, getDataAsString, remove };
