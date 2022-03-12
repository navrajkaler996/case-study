import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = (props) => {

  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {clientId, clientSecret, redirectURL} = useSelector(state => state)

  useEffect(()=> {
    //if the user is authenticated from github,
    //then it will return to /login with a code
    //if code is their, then we can use it to
    //authentication and get user details
    if(window.location.href.includes("code")){
      setLoader(true)
      const code = window.location.href.split("?code=")[1]
      proxyReq(code)
    }

  }, [])

  //function to authenticate user and get user details
  const proxyReq = async (code) => {
    
    try{
      const data = await axios.post("http://localhost:4000/auth", {code: code, clientId: clientId, clientSecret: clientSecret, redirectURL:  redirectURL})
      //dispatching actions with user data and code
      dispatch({type: "LOGIN", payload: {userData: data.data, code: code}})
      navigate("/home")
   
    }
    catch(e){
      console.log(e)
      setError(true)
      setLoader(false)
    }
  }

  return (

    <>
      <Row>
        <Col md={3}>

        </Col>
        <Col md={6}>

          <Card className='login' >
            {loader && <h3 className='center-2'>Loading....</h3> }
          
          {!loader && !error &&  <Card.Body className='d-flex flex-column align-items-center'>
              <h2 className='mt-4 center-2'>Welcome to ManageGit</h2>
              <h3 className='mt-4 p-4 center-2'>The best place to manage your Git repositries and activities</h3>
              
             <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectURL}`} style={{marginTop: "7em", textDecoration: "none"}} >
               
               <span className='button-login'>SignIn using Github</span>
              </a> 
             
            </Card.Body>}
            {error && <h2 className='center-2 center-2-error'> Some error occured! </h2>}
          </Card>
        
        </Col>
        <Col md={3}>
          
          </Col>
      </Row>
    </>
  )
}

export default Login