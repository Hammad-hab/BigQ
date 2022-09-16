
export default function ClientQuestion({v}) {
   return <div className="alert alert-danger">
   <b>{v.q}</b>
   <br/>
   <br/>
   {
    v.opts.map(v => {
    i += 1
     return <span>
        <input type="radio" name={"opt-" + i} />
        <label htmlFor={"opt-"+i}>{v}</label>
     </span>
    })
   }
   </div>
}