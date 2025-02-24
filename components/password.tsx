
import {useState} from "react"
import {Eye,EyeOff} from "lucide-react"
import { Input } from "./ui/input"
const PasswordToggle =( {...props})=>{
    const [toggle,setToggle] = useState(true)
  return(
    <div className="w-full my-3" aria-label="input-password-toggle">
        <div className="relative w-full">
            <Input type={toggle?"text":"password"} placeholder="Enter Password" {...props}/>
            <span className="absolute cursor-pointer text-slate-400 right-4 top-2/4 -translate-y-2/4" onClick={()=> setToggle(toggle===true?false:true)}>
               
               {
                toggle===true?(<EyeOff size={20}/>):( <Eye size={20}/>)
               } 
               
            </span>
        </div>
    </div>
  )
}

export default PasswordToggle