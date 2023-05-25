import React, { useState, useEffect } from "react";
import "./App.css";
import logo from './images/logo.png';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import PaymentMessage from "./components/PaymentMessage/PaymentMessage";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import useAPI from "./API";


function App() {
  const [loading, setLoading] = useState(true);
  const [dummydata,setdummyData] = useState([]);
  const [data,setData] = useState([]);
  const [infData, setInterface] = useState([]);
  const [totalMessages, setTotalMessages] = useState([]);
  const [totalData, setTotalData] = useState([]);
   const [filter, setFilter] = useState('');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  },[]);
  useEffect(() => {
     fetch("http://localhost:8000/liq/messageOutputs",)
      .then(response => response.json())
      .then(data => setData(data));
   
      fetch("http://localhost:8000/req/messageOutputs")
      .then(response => response.json())
      .then(data => setInterface(data));
      // setTotalData(data.filter(
      //   row=>{
      //     return infData.find(rows => rows.outputSourceId === row.liqOutputMessageId)
      //   }
      // ))
    

      const mergedData = data.map(item1 => {
        const correspondingItem2 = infData.find(item2 => item2.outputSourceId === item1.liqOutputMessageId);
        return { ...item1, ...correspondingItem2 };
      });

    // Now you have the joined data
    // console.log(joinedData);
    setTotalData(mergedData)
  console.log('AllData -- ',totalData)
})

 
  return (
    <div className="App">
    {loading ? (
      <div className="loading">
        <img src={logo} alt="" />
        <div className="spinner"></div>
      </div>
    ) : (
      <>
        <Router>
          <Header logo={logo} filter={filter} onFilterChange={handleFilterChange} />
          <Navbar/>
          <Routes>
            <Route  path="/" element={<Dashboard data={data} />}/>
            <Route path="/PaymentMessage" element={<PaymentMessage data={data} inf={infData} totalData={totalData}  filter={filter}/>}/>
          </Routes>
          <Footer/>
        </Router>
      </>
    )}
  </div>
  );
}

export default App;
