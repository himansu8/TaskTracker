import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
//import { toast } from "react-toastify";
import './signup.css'
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

//let { firstName, lastName, email, phone, password } = req.body

function SignUp() {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""

  })
  const { firstName, lastName, email, phone, password } = formData;


  function onChangeHandler(e) {
    //console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  async function onClick(e) {
    try {
      e.preventDefault();
      console.log(formData)
      let res = await axios.post('/api/user/signup', formData)
      console.log(res.data)
      window.alert("You have successfully registered")
      //toast.success("You have successfully registered")
      navigate('/login');

    }
    catch (error) {
      let errorString = "";
      //handling express validator errors
      if (error.response.data.errors) {
        error.response.data.errors.forEach((ele) => {
          errorString += `${ele.msg} `
        })

        window.alert(errorString)
        //toast.error(errorString);
      }
      else {
        //Custom errors
        errorString = error.response.data.error;
        window.alert(errorString)
        //toast.error(errorString);
      }
    }

  }
  function onClear(e) {
    e.preventDefault();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: ""
    });
  }


  return (
    <>
    <Navbar/>
    <div className="signup-main">
  <div className="signup">
    <form>
      <label>
        <b>FirstName</b><br />
        <input type="text" placeholder="Enter firstName" name="firstName" onChange={onChangeHandler} value={firstName} />
      </label>
 
      <label>
        <b>LastName</b><br />
        <input type="text" placeholder="Enter lastName" name="lastName" onChange={onChangeHandler} value={lastName} />
      </label>

      <label>
        <b>Email</b><br />
        <input type="email" placeholder="Enter email" name="email" onChange={onChangeHandler} value={email} />
      </label>

      <label>
        <b>Phone Number</b><br />
        <input type="text" placeholder="Enter phone" name="phone" onChange={onChangeHandler} value={phone} />
        <p>
          <ul>
            <li>Phone Number with country code</li>
          </ul>
        </p>
      </label>
      <label>
        <b>Password</b><br />
        <input type="password" placeholder="Enter Password" name="password" onChange={onChangeHandler} value={password} />
        <p>Password will meet the following requirements
          <ul>
            <li>An English uppercase character (A-Z)</li>
            <li>An English lowercase character (a-z)</li>
            <li>A number (0-9) and/or symbol (such as !, #, or %)</li>
            <li>Eight or more characters total.</li>
          </ul>
        </p>
      </label>
      <div className="button-container">
        <button type="submit" onClick={onClick}>Submit</button>
        <button type="button" onClick={onClear}>Cancel</button>
      </div>
    </form>
  </div>
  <div className="signup_img">
    <img className="signup_img1" src="https://i.pinimg.com/736x/88/12/e0/8812e0c1d68c0348a050d39ab7217705.jpg" width={"530px"} height={"130px"} />
    <div className="p2">
      <p className="p3"><b>Already Have An Account</b></p>
      <center><Link to={'/login'}>Log In</Link></center>
    </div>
  </div>
</div>

      <Footer/>
    </>
  )
}

export default SignUp