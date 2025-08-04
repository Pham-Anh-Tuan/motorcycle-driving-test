import { useState } from "react";
import Home from "./pages/Home";
import Login from "./components/Login/LogIn";
import ForgetPassword from "./components/Login/ForgetPassword";
import Register from "./components/Login/Register";

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [forgetPwPopup, setForgetPwPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Home setLoginPopup={setLoginPopup}/>
      {loginPopup && <Login setLoginPopup={setLoginPopup} setForgetPwPopup={setForgetPwPopup} setRegisterPopup={setRegisterPopup}/>}
      {forgetPwPopup && <ForgetPassword setForgetPwPopup={setForgetPwPopup}/>}
      {registerPopup && <Register setRegisterPopup={setRegisterPopup} setLoginPopup={setLoginPopup}/>}
    </div>
  )
}

export default App;