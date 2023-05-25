import React, { useState, useRef, useEffect} from 'react';
import  {DashboardContainer, DashboardHeading, DashboardSubHeading, DashboardHeaderWrapper, DashboardLeft, DashboardRight, DashboardContent} from './styledComponents';
import Filter from './Filter';
import StatusCard from './StatusCard';
import BarChart from './Barchart';
import HistoryCard from './History';
import DonutChart from './Piechart';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  gap: 10px;
`;



const Label = styled.label`
  margin-right: 10px;
  font-size: 12px;
  font-weight: 700;
`;
const CheckboxLabel = styled.label`
  margin-right: 8px;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  padding-bottom: 3px;
  border-bottom: 1px #ddd solid;
`;

const ColumnToggleWrapper = styled.div`
  overflow-x:hidden;
  max-height:300px;
  overflow-y:scroll;
  display: flex;
  align-items: start;
  position: absolute;
  top: 100%;
  right: 0;
  width: fit-content;
  border: 1px #ddd solid;
  border-radius: 5px;
  font-size: 12px;
  flex-direction: column;
  justify-content: start;
  padding: 5px;
  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  &::-webkit-scrollbar {
    width: 13px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 20px;
    border: 3px solid #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: #003a64;
  }
`;

const TableColumns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  flex-wrap: wrap;
`;

const TableColumn = styled.div`
  margin-right: 8px;
  cursor: pointer;
`;
const Select = styled.select`
  padding: 2px;
  outline:none;
  background: #f9f9f9;
  border-radius: 3px;
  font-size: 12px;
`;
function Dashboard({data}) {
  
  // const [sentMessages , setSentMessages]  = useState(
  //   (data.filter(row =>{
  //    return  row.queueStatCode === "DELV " || row.queueStatCode === "CONF "
  //   })).length
  // );
  // const [failedMessages , setfailesMessages]  = useState(
  //   (data.filter(row =>{
  //    return  row.queueStatCode === "FAIL "
  //   })).length
  // );
  // const [pendingMessages , setPendingMessages]  = useState(
  //   (data.filter(row =>{
  //    return  row.queueStatCode === "PEND "
  //   })).length
  // );
  let delivered ,confirmed, failed, pending, sented=  0;
  delivered =   data.filter(
    row=>{
      return row.queueStatCode === "DELV " 
    }
  ).length  
  pending  =   data.filter(
    row=>{
      return row.queueStatCode === "PEND " 
    }
  ).length
  failed =   data.filter(
    row=>{
      return row.queueStatCode === "FAIL " 
    }
  ).length
  confirmed =   data.filter(
    row=>{
      return row.queueStatCode === "CONF " 
    }
  ).length
  const messageStat = [
    {
      title: 'DELV/CONF',
      number: delivered + confirmed,
      bgColor: '#fff',
      fontColor: "#000",
    },
    {
      title: 'PEND',
      number: pending,
      bgColor: '#fff',
      fontColor: "#000",
    },
    {
      title: 'FAIL',
      number: failed,
      bgColor: '#fff',
      fontColor: "#000",
    },
    {
      title: 'Total Messages',
      number: data.length,
      bgColor: '#005296',
      fontColor: "#fff",
    },
  ];

  const messages = [
    {
      application: 'LoanIQ Message',
      type: 'MT103',
      referenceNumber: '030523USD100000',
      date: '2022-05-01',
      status: 'Sent',
    },
    {
      application: 'Murex Message',
      type: 'MT202',
      referenceNumber: '030523USD100000',
      date: '2022-05-02',
      status: 'Failed',
    },
    {
      application: 'LoanIQ Message',
      type: 'MT103',
      referenceNumber: '030523USD100000',
      date: '2022-05-03',
      status: 'Sent',
    },
    {
      application: 'LoanIQ Message',
      type: 'MT103',
      referenceNumber: '030523USD100000',
      date: '2022-05-03',
      status: 'Sent',
    },
    {
      application: 'LoanIQ Message',
      type: 'MT103',
      referenceNumber: '030523USD100000',
      date: '2022-05-03',
      status: 'Sent',
    },
    {
      application: 'LoanIQ Message',
      type: 'MT103',
      referenceNumber: '030523USD100000',
      date: '2022-05-03',
      status: 'Sent',
    },
    {
      application: 'LoanIQ Message',
      type: 'MT103',
      referenceNumber: '030523USD100000',
      date: '2022-05-03',
      status: 'Sent',
    },
  ];
  const [branch, setBranch] = useState('');
  const [application, setApplication] = useState('');
  const [paymentType, setPaymentType] = useState('');
  //all dynamic branch coming from API
  let [branchCodes, setBranchCodes] = useState((data.map(item => item.branchCode)).filter((item, index) => {
    return (data.map(item => item.branchCode)).indexOf(item) === index;
  }))
  let [paymentTypes, setPaymentTypes] = useState((data.map(item => item.paymentType)).filter((item, index) => {
    return (data.map(item => item.paymentType)).indexOf(item) === index;
  }))
  //handle filter data
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  
   
  };

  const handleApplicationChange = (event) => {
    setApplication(event.target.value);
    
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);

  };



  
  return (
    <>
      <DashboardContainer>
        <DashboardHeaderWrapper>
          <div>
            <DashboardHeading>DASHBOARD</DashboardHeading>
            <DashboardSubHeading>Welcome to your dashboard!</DashboardSubHeading>
          </div>
          {/* filter  */}
          <FilterContainer>
      <div>
        <Label htmlFor="branch">Branch:</Label>
        <Select id="branch" value={branch} onChange={handleBranchChange}>
          <option value="ALL">All</option>
          {branchCodes.map(item => 
            <option value={item}>{item}</option>
            
            )}
          
          {/* <option value="400">400 - Abu Dhabi</option> */}
        </Select>
      </div>

      <div>
        <Label htmlFor="application">Application:</Label>
        <Select id="application" value={application} onChange={handleApplicationChange}>
          <option value="ALL">All</option>
          <option value="LOAN IQ">Loan IQ</option>
         
        </Select>
      </div>

      <div>
        <Label htmlFor="paymentType">Payment Type:</Label>
        <Select id="paymentType" value={paymentType} onChange={handlePaymentTypeChange}>
          <option value="ALL">All</option>
          {paymentTypes.map(item => 
            <option value={item}>{item}</option>
            
            )}
        </Select>
      </div>
    </FilterContainer>
        </DashboardHeaderWrapper>
        <DashboardContent>
          <DashboardLeft>
            <StatusCard heading="Message Status" boxes={messageStat} />
            {/* <StatusCard heading="MESSAGE GENERATED/PROCESSED" boxes={messageGen} /> */}
            <BarChart sent={confirmed + delivered} data={data} branch={branch} application={application} paymentType={paymentType}/>
          </DashboardLeft>
          <DashboardRight>
            <HistoryCard messages={data}  />
            <DonutChart sent={confirmed + delivered} data={data} branch={branch} application={application} paymentType={paymentType}/>
          </DashboardRight>
        </DashboardContent>
      </DashboardContainer>
      
    </>
  )
}

export default Dashboard
