import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
import paymentMessages from '../PaymentMessage/PaymentMessage';

const Card = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: fit;
`;
const Heading = styled.h3`
  margin:0 10px;
  font-size: 12px;
  border-bottom: 1px #bbb solid;
  padding-bottom: 8px;
  margin-bottom: 20px;
  color: #77777;
`;

function BarChart({sent,data, branch , application , paymentType}) {
  let dataGraph = "";
  let distinctMessage = "";
  let messgaeValues = [];
  let delMessage = [];
  let pendMessage = [];
  let failMessage = [];
  let confMessage = [];
  let delevered ,confirmed, failed, pending, sented=  0;
  let heading = "";

  if(branch != '' && branch != "ALL" && application == "LOAN IQ" ){
 
  if(paymentType !== "" && paymentType !== "ALL"){
    
    //for payment type

    dataGraph =  data.filter(
      row=>{
        return row.branchCode === branch && row.paymentType === paymentType
      }
    )

  if(dataGraph.length == 0){
    console.log("no data available---")
    heading = "no data available"
  }else{
    heading = paymentType;
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
    messgaeValues.map(item=>{
      delMessage = [...delMessage ,item.filter(
        row=>{
          return row.queueStatCode === "DELV ";
        }
      ).length]
      
    })
    messgaeValues.map(item=>{
      pendMessage = [...pendMessage, item.filter(   
        row=>{
          return row.queueStatCode === "PEND ";
        }
      ).length]
      
    })
    messgaeValues.map(item=>{
      confMessage = [...confMessage, item.filter(   
        row=>{
          return row.queueStatCode === "CONF ";
        }
      ).length]
      
    })
    messgaeValues.map(item=>{
      failMessage = [...failMessage, item.filter(   
        row=>{
          return row.queueStatCode === "FAIL ";
        }
      ).length]
      
    })
    console.log("dele  -- ",delMessage);
  }
    //for payment type
  }else{
    heading = "Message Type"
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
    messgaeValues.map(item=>{
      delMessage = [...delMessage ,item.filter(
        row=>{
          return row.queueStatCode === "DELV ";
        }
      ).length]
      
    })
    messgaeValues.map(item=>{
      pendMessage = [...pendMessage, item.filter(   
        row=>{
          return row.queueStatCode === "PEND ";
        }
      ).length]
      
    })
    messgaeValues.map(item=>{
      confMessage = [...confMessage, item.filter(   
        row=>{
          return row.queueStatCode === "CONF ";
        }
      ).length]
      
    })
    messgaeValues.map(item=>{
      failMessage = [...failMessage, item.filter(   
        row=>{
          return row.queueStatCode === "FAIL ";
        }
      ).length]
      
    })

  }
  }else 
  {
    if((branch == '' || branch == "ALL") && application == "LOAN IQ" && paymentType != '' && paymentType != 'ALL'){
      console.log("add branch -- ",branch)
      console.log("add app -- ",application)
      console.log("add payment type -- ",paymentType)

      //only payment type
      dataGraph =  data.filter(
        row=>{
          return row.paymentType === paymentType
        }
      )
      heading = paymentType;
      // delevered =  dataGraph.filter(
      //   row=>{
      //     return row.queueStatCode === "DELV " 
      //   }
      // ).length  
      // pending  = dataGraph.filter(
      //   row=>{
      //     return row.queueStatCode === "PEND " 
      //   }
      // ).length
      // failed = dataGraph.filter(
      //   row=>{
      //     return row.queueStatCode === "FAIL " 
      //   }
      // ).length
      // confirmed = dataGraph.filter(
      //   row=>{
      //     return row.queueStatCode === "CONF " 
      //   }
      // ).length
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
      messgaeValues.map(item=>{
        delMessage = [...delMessage ,item.filter(
          row=>{
            return row.queueStatCode === "DELV ";
          }
        ).length]
        
      })
      messgaeValues.map(item=>{
        pendMessage = [...pendMessage, item.filter(   
          row=>{
            return row.queueStatCode === "PEND ";
          }
        ).length]
        
      })
      messgaeValues.map(item=>{
        confMessage = [...confMessage, item.filter(   
          row=>{
            return row.queueStatCode === "CONF ";
          }
        ).length]
        
      })
      messgaeValues.map(item=>{
        failMessage = [...failMessage, item.filter(   
          row=>{
            return row.queueStatCode === "FAIL ";
          }
        ).length]
        
      })
    }
      //only payment type
    else{
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
 
    const chartData = {
      options: {
        legend: {
          position: "right", // set the position of the legend to the right
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            stacked: false,
            columnWidth: '40px', 
            columnSpacing: '10px', 
            dataLabels: {
              position: 'top'
            }
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: '10px',
            colors: ["#304758"]
          }
        },

        colors: ['#2ECC71','#005296', '#ed732a', '#E74C3C'],
        xaxis: {
          categories: distinctMessage ? distinctMessage :  ['LOAN IQ'],
          title: {
            text: distinctMessage  ?  heading : heading ? heading : "APPLICATIONS"
          }
        },
        yaxis: {
          title: {
            text: 'NUMBER OF MESSAGES',
          
          }
        }
      },
      
      
    };
    // let name = "";
    let mesDataValue = [];
    messgaeValues.map((row,index)=>{
      console.log('index -- ',index)
      mesDataValue = [...mesDataValue,messgaeValues[index].length]
    })  

    chartData.series =  distinctMessage ?  [
      {
        name: 'Confirmed',
        data:   confMessage
      }
      ,{
        name: 'Delivered',
        data:   delMessage
      },
      {
        name: 'Pending',
        data:   pendMessage
      },
      {
        name: 'Failed',
        data:   failMessage
      }
    ] : [ {
        name: 'Confirmed',
        data:   [confirmed ? confirmed : 0],
      },{
        name: 'Delivered',
        data:  [delevered ? delevered : 0]
      }
      ,{
        name: 'Pending',
        data:  [pending ? pending : 0]
      },
      {
        name: 'Failed',
        data:  [failed ? failed : 0]
      },
    ]


  
    return (
      <Card>
        <Heading>Payment Message Overview</Heading>
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} width={700} style={{display:'flex', justifyContent: 'center'}}/>
      </Card>
    );
  }

  export default BarChart;
