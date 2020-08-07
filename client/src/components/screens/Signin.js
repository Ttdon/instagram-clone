import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Signin = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history=useHistory()
  
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const PostData= ()=>{
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return
      }
      fetch("/signin",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              
              password,
              email
              
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
          if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html: "signedin success",classes:"#43a047 green darken-1"})
             history.push('/')
          }
          console.log(data)
          console.log("in singup")
      }).catch(err=>{
          console.log(err)
      })
  
  }
  
    return(
       <div className="mycard">
       <div className="card auth-card input-field ">
       <h2>Instagram</h2>
       
       <input type="text"
       placeholder="email"
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password"
       placeholder="password"
        value={password}
         onChange={(e)=>setPassword(e.target.value)}/>
       <button className="btn #512da8 deep-purple darken-2" 
       onClick={()=>PostData()} >
       Login
       
     </button>
      
      <h5><Link to="/signup">Already don't have account ?</Link></h5>
      <h6>
                <Link to="/reset">Forgot password ?</Link>
            </h6>
      </div>
      </div>
    )
}

export default Signin