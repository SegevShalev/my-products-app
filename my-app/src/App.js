import "./App.css";
import {  Link, Route, Routes } from "react-router-dom";
import React, {  useState,useEffect } from "react";
import Home from './routes/Home'
import Admin from "./routes/Admin";

import axios from 'axios'


function App() {
const [data,setData] = useState([])
const [shoppingList, setShoppingList] = useState()

useEffect(() => {
  async function fetchData() {
    try {
      let fetchData = (await axios.get(`http://localhost:8080/`)).data.products;
      setData(fetchData);
    } catch {console.log("something went wrong...")}
  }
  fetchData();
}, []);



 const updateDataCallback = async(newData) => {
   setData(newData);
   try {
     await axios.post(`http://localhost:8080/`, {
      products:newData
    }); 
  } catch (err) {
    console.log(err);
  }
}



  return (
    <div className="App">
      <div >
        <Link to="admin">admin</Link> | {""}
        <Link to="home">home</Link>  {""}
         <br/><br/>
      </div>
      <Routes>
      <Route  path = '/'  />
        <Route  path = '/admin' element={<Admin dataCallback={(newData) => updateDataCallback (newData)} init_data={data}/>}  />
        <Route  path = '/home' element={<Home products={data}/>}  />
      </Routes>
    </div>
  );
}

export default App;
