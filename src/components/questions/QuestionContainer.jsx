export default function Container(props) {
    return <div className={props.className ? "questions " + props.className: "questions"} id="holder">
        {props.children}
   </div>
}