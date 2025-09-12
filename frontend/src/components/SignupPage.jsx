import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import image123 from '../assets/s.png';

const SignupPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [conpassword,setConPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        if(password === conpassword){
            window.alert("Signup Success");
            navigate("/");
        }
        else{
            window.alert("Correct the form and then click signup");
        }
    }

    return (
    <div>
        <image src={image123} alt = "LOgo image" />
      
        <form onSubmit={handleSignUp} >

             <input type="email" 
                value={email} 
                onChange={ (e)=> setEmail(e.target.value) }
                placeholder="Enter Email" 
                required
            />
            <br/>

            <input type="password" 
                value={password} 
                onChange={ (e)=> setPassword(e.target.value) } 
                placeholder="Enter Password" 
                required
            />
            <br/>

            <input type="password" 
                value={conpassword} 
                onChange={ (e)=> setConPassword(e.target.value) } 
                placeholder="Re Enter Password"
                required 
            />
            <br/>

            <input type="submit" value="Sign Up" />
            <br/>


        </form>

    </div>
  );
};

export default SignupPage;


