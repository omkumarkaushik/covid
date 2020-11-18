import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
//import CardColumns from 'react-bootstrap/CardColumns'
//import CardDeck from 'react-bootstrap/CardDeck'
import Columns from 'react-columns'
//import InputGroup from 'react-bootstrap/InputGroup'
//import FormControl from 'react-bootstrap/FormGroup'
import { Form } from 'react-bootstrap';


function App() {
 const [latest,setLatest]=useState([])
 const [results,setResults]=useState([])
 const [searchCountry, setSearchCountry]=useState("")
 
 useEffect(()=>{
   axios.
   all([
     axios.get("https://corona.lmao.ninja/v3/covid-19/all")
     ,axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
    ])
    .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data)
    })
  .catch(err => {
    console.log(err);
  })

 })

 const filterSearch = results.filter(item=>{
  return item.country === searchCountry
 })

 const countries= filterSearch.map(data=>{
  return(
    <div className="card" key={data.country}>
    <img src={data.countryInfo.flag} className="card-img-top" alt="..."/> 
  <div className="card-body">
    <h5 className="card-title">{data.country}</h5>
    <p className="card-text">
      Total Cases: {data.cases}<br/>
      Total Deaths: {data.deaths}<br/>
      Total Recovered: {data.recovered}
    </p>
  </div>
    </div>
  )
})


var queries = [{
  columns: 2,
  query: 'min-width: 500px'
}, {
  columns: 4,
  query: 'min-width: 1000px'
}];

  return (
    <div className='app'>
      <h3 style={{marginLeft:"600px" ,color:"brown"}}>Covid-19 Tracker</h3>
       <div className="card" style={{width:"18rem", marginLeft:'110px', marginTop:'100px', marginBottom:'100px'}}>
  <ul className="list-group list-group-flush">
  <li className="list-group-item" style={{backgroundColor:'coral'}}>Total Cases:{latest.cases}</li>
    <li className="list-group-item" style= {{backgroundColor:'green'}}>Total Recovred: {latest.recovered}</li>
  <li className="list-group-item" style={{backgroundColor:'red'}}>Total Deaths:{latest.deaths}</li>
  </ul>
</div>
<Form>
  <Form.Group controlId='formGroupSearch'>
    <Form.Label style={{fontWeight:'bold'}}>Search the Country</Form.Label>
    <Form.Control type="search" placeholder='eg Barbados' 
    onChange={(e)=>setSearchCountry(e.target.value)}/>
  </Form.Group>
</Form>
<Columns queries={queries}>{countries}</Columns>


    
    </div>
  );
  }
export default App;
