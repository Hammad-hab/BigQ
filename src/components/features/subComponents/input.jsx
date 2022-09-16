import { Component, useState } from "react"

export default function Input({ivalue="input", id, className, onChange=(v) => {}, type="text", focus=false}) {
const [value, set] = useState(ivalue)
return <input id={id} className={className} value={value} type={type} onChange={e => {
    set(e.target.value)
    onChange(value)
}} autoFocus={focus}/>
}

