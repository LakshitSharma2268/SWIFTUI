import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Card = styled.div`
  width: fit;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 16px;
`;

const Header = styled.div`
  font-size: 12px;
  color: #77777;
  font-weight: bold;
  border-bottom: 1px #bbb solid;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const Message = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #bbb solid;
  padding-bottom: 5px;
  font-size: 12px;
  margin-bottom: 8px;

  &:nth-child(3){
    border-bottom: 1px #fff solid;
  }
`;

const MessageDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ViewAllLink = styled.p`
  display: block;
  font-weight: bold;
  cursor: pointer;
  font-size: 12px;
  margin: 16px 0px 0px 0px;
  text-align: right;
  transition: all .2s ease-in-out;
  &:hover{
    color: #005296;
  }
`;


const HistoryCard = ({ messages }) => {
  const limit = messages.slice(0,2);
  return (
    <Card>
      <Header>Recent Messages</Header>
      {limit.map((message, index) => (
        <Message key={index}>
          <MessageDetails>
            <div style={{fontWeight: "bold"}}>{"LOAN IQ"}</div>
            <div>Type: {message.messageType}</div>
            <div>Ref.No.: {message.liqOutputMessageId}</div>
          </MessageDetails>
          <div style={{textAlign: 'right'}}>
            <div style={{paddingBottom: '3px'}}>Status: {message.queueStatCode}</div>
            <div>{message.recCreateTime}</div>
          </div>
        </Message>
      ))}
      <ViewAllLink><Link to="/PaymentMessage">View All</Link></ViewAllLink>
    </Card>
  );
};

export default HistoryCard;
