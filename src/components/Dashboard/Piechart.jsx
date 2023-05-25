import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 10px 22px 10px;
`;
const Header = styled.div`
  font-size: 12px;
  color: #77777;
  font-weight: bold;
  border-bottom: 1px #bbb solid;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const DonutChart = ({ data, branch, application , paymentType }) => {

  let dataGraph = "";
  let distinctMessage = "";
  let messgaeValues = [];
  let delevered ,confirmed, failed, pending, sented=  0;
  if(branch != '' && branch != "ALL" && application == "LOAN IQ" ){
    if(paymentType !== "" && paymentType !== "ALL"){
      // for payment type
      dataGraph =  data.filter(
        row=>{
          return row.branchCode === branch && row.paymentType === paymentType
        }
      )
      if(dataGraph.length == 0 ){

      }else{
      let temp = (dataGraph.map(item => item.messageType)).filter((item, index) => {
        return (dataGraph.map(item => item.messageType)).indexOf(item) === index;
      })
      distinctMessage = temp.sort((a, b) => {
        const alphanumericA = a.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string A
        const alphanumericB = b.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string B
    
        if (alphanumericA === alphanumericB) {
          return a.localeCompare(b); // If the alphanumeric portions are equal, sort based on the original string
        }
    
        return alphanumericA.localeCompare(alphanumericB); // Sort based on the alphanumeric portion
      });
      distinctMessage.map(item=>{
        messgaeValues  = [...messgaeValues ,dataGraph.filter(
          row=>{
            return row.messageType == item;
          }
        ) ]
      })
      console.log("message  -- ",messgaeValues);
    }
      //for payment type
    }else{
      
   dataGraph =  data.filter(
      row=>{
        return row.branchCode === branch
      }
    )
    let temp = (dataGraph.map(item => item.messageType)).filter((item, index) => {
      return (dataGraph.map(item => item.messageType)).indexOf(item) === index;
    })
    distinctMessage = temp.sort((a, b) => {
      const alphanumericA = a.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string A
      const alphanumericB = b.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string B
  
      if (alphanumericA === alphanumericB) {
        return a.localeCompare(b); // If the alphanumeric portions are equal, sort based on the original string
      }
  
      return alphanumericA.localeCompare(alphanumericB); // Sort based on the alphanumeric portion
    });
    distinctMessage.map(item=>{
      messgaeValues  = [...messgaeValues ,dataGraph.filter(
        row=>{
          return row.messageType == item;
        }
      ) ]
    })
    console.log("message  -- ",messgaeValues);
  }
  }else{
    if((branch == '' || branch == "ALL") && application == "LOAN IQ" && paymentType != '' && paymentType != 'ALL'){
      dataGraph =  data.filter(
        row=>{
          return row.paymentType === paymentType
        }
      )
      let temp = (dataGraph.map(item => item.messageType)).filter((item, index) => {
        return (dataGraph.map(item => item.messageType)).indexOf(item) === index;
      })
      distinctMessage = temp.sort((a, b) => {
        const alphanumericA = a.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string A
        const alphanumericB = b.replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters from string B
    
        if (alphanumericA === alphanumericB) {
          return a.localeCompare(b); // If the alphanumeric portions are equal, sort based on the original string
        }
    
        return alphanumericA.localeCompare(alphanumericB); // Sort based on the alphanumeric portion
      });
      distinctMessage.map(item=>{
        messgaeValues  = [...messgaeValues ,dataGraph.filter(
          row=>{
            return row.messageType == item;
          }
        ) ]
      })
    }else{
    delevered =  dataGraph =  data.filter(
      row=>{
        return row.queueStatCode === "DELV " 
      }
    ).length  
    pending  = dataGraph =  data.filter(
      row=>{
        return row.queueStatCode === "PEND " 
      }
    ).length
    failed = dataGraph =  data.filter(
      row=>{
        return row.queueStatCode === "FAIL " 
      }
    ).length
    confirmed = dataGraph =  data.filter(
      row=>{
        return row.queueStatCode === "CONF " 
      }
    ).length
    }
  }
  const options = {
    chart: {
      type: 'donut',
      height: '100px',
    },
    colors: ['#2ECC71','#005296', '#ed732a', '#E74C3C'],
    labels: distinctMessage ? distinctMessage : ['Confirmed', 'Delivered', 'Pending', 'Failed'],
    dataLabels: {
      enabled: true,
    },
    dataLabels: {
      formatter: (val) => {
        return val.toFixed(2) + '%';
      },
    },
    legend: {
      position: 'bottom',
      offsetY: 8,
      labels: {
        colors: '#828D99',
      },
    },
  };
  let mesDataValue = [];
  messgaeValues.map((row,index)=>{
    console.log('index -- ',index)
    mesDataValue = [...mesDataValue,messgaeValues[index].length]
  }) 

  const series = distinctMessage != "" ?  mesDataValue  : [confirmed ? confirmed : 0, delevered ? delevered : 0, pending ? pending :  0, failed ? failed : 0];

  return (
    <Card>  
      <Header>Summary</Header>
      <Chart options={options} series={series} type="donut" width="100%" height={280}/>
    </Card>
  );
};

export default DonutChart;
