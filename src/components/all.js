import Question from "./questions/questions";
import Toolbar from "./sorting/toolbar";
import Popover from "./message/popup";
import axios from "axios";
function getDataAsString(url) {
  const res = fetch("https://hammadhab.pythonanywhere.com/" + url);

  return res;
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
// 
