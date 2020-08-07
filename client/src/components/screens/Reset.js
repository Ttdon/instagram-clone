import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Reset = ()=>{
  
  const history=useHistory()
  
  
  const[email,setEmail]=useState("")
  const PostData= ()=>{
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return
      }
      fetch("/reset-password",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              
             
              email
              
          })
      }).then(res=>res.json())
      .then(data=>{
        
          if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
          
            //dispatch({type:"USER",payload:data.user})
            M.toast({html: "data reset success",classes:"#43a047 green darken-1"})
             history.push('/signin')
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
      
       <button className="btn #512da8 deep-purple darken-2" 
       onClick={()=>PostData()} >
       Reset Password
       
     </button>
      
     
      </div>
      </div>
    )
}

export default Reset