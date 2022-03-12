import React, {useEffect, useState ,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import ReusableTable from "../components/Table"
import {COLUMNS_REPOS, COLUMNS_ACTIVITIES} from "../utilities/helper";  

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const [repos, setRepos] = useState([])
  const [activities, setActivities] = useState([])
  const [loader, setLoader] = useState(false)
  const [display, setDisplay] = useState()
  const [error, setError] = useState(false)

  const {userData} = useSelector(state => state)


  const getRepos =  async () => {

    if(error) setError(false)
    setLoader(true)

    try{

      const {data} = await axios.get(`https://api.github.com/users/${userData.login}/repos`)
      
      setRepos(data)
      if(data) setDisplay("repos")
    }
    catch(e){
      setError(true)
    }
      
    setLoader(false)

  }

  
  console.log("home")

  const getActivity = async () => {
    if(error) setError(false)
    setLoader(true)

    try{

      const {data} = await axios.get(`https://api.github.com/users/${userData.login}/events/public`)
      setActivities(data);
      
      if(data) setDisplay("activities")
    }catch(e){
      setError(true)
    }
    setLoader(false)

  }
  const logoutHandler = () => {

    dispatch({type: "LOGOUT"})
    navigate("/login")
  }
  return (
    <div>

      <Row>
        <Col md={1} sm={0}>
        
        </Col>
        <Col md={10} sm={12}>

          <Card className='home'>
            
            <h1 className="heading-welcome">Welcome, {userData && userData.login}</h1>

            <Card.Body className='home-buttons'>
              <span className='button button-home mr-4' onClick={getRepos}>Repositries</span>
              <span className='button button-home' onClick={getActivity}>Activities</span>
              
            </Card.Body>
            <Card.Body style={{width: "90%"}} className="home-card-2">
            <div>
              {loader && <h2 className='center-2'>Loading...</h2>}
              {!loader && !error && display === "repos" && <>
              <h3 className='center-2'>Total repositries: <strong> {repos.length}</strong></h3>
              
               <ReusableTable data={repos} columns={COLUMNS_REPOS}/></>}
              {!loader && !error && display === "activities" && <>
              <h3 className='center-2'>Total activities: <strong> {activities.length}</strong></h3>
               <ReusableTable data={activities} columns={COLUMNS_ACTIVITIES}/></>}
           
              {error && <h2 className='center-2 center-2-error'> Some error occured! </h2>}
            </div>
            <h2 className='button-logout'  onClick={logoutHandler}>Log Out</h2>
            </Card.Body>
          </Card>
          
        </Col>
        <Col md={1} sm={0}>
          
        </Col>
      </Row>



    </div>
  )
}

export default Home