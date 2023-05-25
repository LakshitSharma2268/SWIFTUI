import React from 'react';
import styled from "styled-components";
import SortableTable from './Table/Table';
import {AiOutlineArrowRight} from 'react-icons/ai';
import Filter from '../Dashboard/Filter';

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  margin: 10px 10px 0 10px;
  width: fit-content;
  gap: 5px;
`;
const ArrowIcon = styled(AiOutlineArrowRight)`
  font-size: 13px;
`;
const Label = styled.label`
  margin-right: 10px;
  font-size: 12px;
  font-weight: 700;
`;

function paymentMessages({data,inf,totalData,filter}) {
  // console.log('interface payment',inf)
  // filter ? console.log("dataaa--",filter) : console.log("dataaa -- no")
    const columns = [
        { name: "Application Message Ref#", key: "liqOutputMessageId" },
        { name: "Branch", key: "branchCode" },
        { name: "Payment Type", key: "paymentType" },
        { name: "Deal Ref#", key: "dealPid" },
        { name: "Facility Ref#", key: "facilityPid" },
        { name: "Cashflow Ref#", key: "cashflowId" },
        { name: "Message Owner Ref#", key: "ownerId" },
        { name: "Message Owner Type", key: "ownerType" },
        { name: "Message Type", key: "messageType" },
        { name: "Message Currency", key: "currencyCode" },
        { name: "Message Creation User ID", key: "recCreateUserId" },
        { name: "Message Creation Date/Time", key: "recCreateTime" },
        { name: "Message Update User ID", key: "recUpdateUserId" },
        { name: "Message Update Date/Time", key: "recUpdateTime" },
        { name: "	Message Value Date", key: "valueDate" },
        { name: "Application Message Status", key: "queueStatCode" },

        { name: "Interface Message Ref#", key: "outputMessageId" },
        { name: "Interface Message Status", key: "messageStatus" },
        { name: "Interface Message Creation User ID", key: "createUserId" },
        { name: "Interface Message Creation Date/Time", key: "createTimeStamp" },
        { name: "Interface Message Update User ID", key: "updateUserId" },
        { name: "Interface Message Update Date/Time", key: "updateTimeStamp" },
        // { name: "Interface Message Update Date/Time", key: "updateTimeStamp" },
        
        

        
      ];
      
      // const data = [
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "amar nagaraj joshi sonda karnataka sonda sirsi", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "amar", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD10", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
      //   { ref_no: "100523USD1000000", payment_type: "SWIFT",msg_type:"MT103", creation_dte: "01-05-23 12:30", creation_user: "John", msg_status: "Sent", prcd_msg: "YES", prcd_msg_dte:"01-05-23 12:30", prcd_msg_stat: "Sent", prcd_msg_updt_dte: "01-05-23 12:30",},
     
       
      // ];
  return (
    <div>
      <MainWrapper>
            <h2 style={{margin: '0', fontSize: '15px'}}>Payment Messages</h2>
            {/* <ArrowIcon/>
            <p style={{margin: '0', fontSize: '13px'}}>LoanIQ Messages</p> */}
        </MainWrapper>
        <SortableTable columns={columns} data={data} infData={inf} totalData={totalData} filter={filter} />
        
    </div>
  )
}


export default paymentMessages
