
export default function AttemptableQuestion({vl, Data, index, state}) {
 
  return (
    <div className="alert alert-dark margin-30">
      <h4>Q{index}: {vl.q}</h4>
      <hr />
      Answer: {" "}
      <select style={{outline: "none"}} className={"form-select"} id={"select-"+index} onChange={e => {
       if(document.getElementById("select-"+index).value === vl.a) {
         state.state[index] = "R"
         state.setSt(state.state)
         console.log(state.state)
       } else {
        state.state[index] = "W"
         state.setSt(state.state)
         console.log(state.state)
       }
      }} defaultValue={""}>
      <option></option>
      {Data.map((v) => {
        return <option>{v}</option>
      })}
      </select>
      
    </div>
  );
}

