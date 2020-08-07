import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/Createpost'
import { initialState,reducer } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscriberUserPosts from './components/screens/SubscribeUserPosts'
import NewPassword from './components/screens/Newpassword'
import Reset from './components/screens/Reset'


export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("user"))
  if(user){
    dispatch({type:"USER",payload:user})
    
  }
  else{
    if(!history.location.pathname.startsWith('/reset'))
    history.push('/signin')
  }
  },[])
return(
  <Switch>
  <Route exact path="/">
  <Home />
 </Route>
 <Route path="/signin">
 <Login />
 </Route>
 <Route exact path="/profile">
 <Profile />
 </Route>
 <Route path="/signup">
 <Signup />
 </Route>
 <Route path="/create">
 <CreatePost />
 </Route>
 <Route path="/profile/:userid">
 <UserProfile />
 </Route>
 <Route path="/myfollowingpost">
 <SubscriberUserPosts  />
 </Route>
 <Route path="/reset">
 <Reset  />
 <Route path="/reset/:token">
 <NewPassword  />
 </Route>

 </Route>
 </Switch>
)
}

function App() {
const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
  <NavBar/>
  <Routing/>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
