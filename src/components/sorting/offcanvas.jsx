export default function Offcanvas(props) {
    return <div className="offcanvas offcanvas-start" tabIndex="-1" id={props.name} aria-labelledby="offcanvasExampleLabel">
         <div className="offcanvas-header">
             <h5 className="offcanvas-title" id="offcanvasExampleLabel">{props.heading}</h5>
             <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
         </div>
 
         <hr/>
         <div className="offcanvas-body">
             {props.children}
         </div>
         </div>
 }