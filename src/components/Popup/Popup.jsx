import React, { useState } from "react";
import {PopupWrapper, PopupContainer, InputWrapper, ButtonContainer, Button} from "./styledComponents";
import logo from '../../images/logo.png';
import styled from "styled-components";
import {RiCloseLine} from 'react-icons/ri';

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-size: 13px;
  border-bottom: 1px #ccc solid;
  padding-bottom: 5px;
`;
const PopupHeaderLogo = styled.img`
  height: 25px;
`;
const CloseWrap = styled.div`
  width: 100px;
  display: flex;
  justify-content: end;
`;
const CloseButton = styled(RiCloseLine)`
 cursor:pointer;
 margin: 0;
 font-size: 20px;
 transition: all .3s ease-in-out;

 &:hover{
  color: red;
 }
`;

const InputContainer = styled.div`
 max-height: 300px;
 overflow-y: scroll;
 padding: 0px 20px 20px 20px;
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

const RangeInputWrapper = styled.div`
display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 10px;
  label {
    margin-bottom: 8px;
    font-size: 12px;

    &:placeholder{
      font-size: 12px;
    }
  }

  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    transition: all .1s ease-in-out;
  }
  input:focus {
    border: 2px #005296 solid;
  }
`;

const Popup = ({ title,RangeInputs, SingleInputs, onClose , onFilterChange }) => {
  const [messageType,setMessageType] = useState();
  const [messageStatus,setMessageStatus] = useState();
  const [currency,setCurrency] = useState();

  const handleMessageTypeChange = (event) => {
    setMessageType(event.target.value)
  }
  const handleMessageStatusChange = (event) => {
    setMessageStatus(event.target.value)
  }
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value)
  }
  const handleApplyClick = (event) =>{
    onFilterChange(messageType+","+messageStatus+","+currency);
  }


  return (
    <PopupWrapper onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <PopupHeader>
          <PopupHeaderLogo src={logo} />
         <h3 style={{margin: '0'}}> {title}</h3>
          <CloseWrap><CloseButton onClick={onClose}/></CloseWrap>
        </PopupHeader>
        <InputContainer>
          
            <InputWrapper key="msg_type">
              <label htmlFor="msg_type">Message Type</label>
              <input type="text" id="msg_type" value={messageType} onChange={handleMessageTypeChange} />
            </InputWrapper>
            <InputWrapper key="msg_status">
              <label htmlFor="msg_status">Message Status</label>
              <input type="text" id="msg_type" value={messageStatus} onChange={handleMessageStatusChange}/>
            </InputWrapper>
            <InputWrapper key="currency">
              <label htmlFor="currency">Currency</label>
              <input type="text" id="currency" value={currency} onChange={handleCurrencyChange}/>
            </InputWrapper>
        
            <RangeInputWrapper>
              <div>
                <label htmlFor='amount'>Amount</label>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '20px',marginTop: '8px'}}>
                  <input style={{width: '100%'}} type='text' id='amount' placeholder="From"/>
                  <input style={{width: '100%'}} type='text' id='amount' placeholder="To"/>
                </div>
              </div>
              <div style={{marginTop: '16px'}}>
                <label htmlFor='process_dte'>Processing Date</label>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '20px',marginTop: '8px'}}>
                  <input style={{width: '100%'}} type='date' id='process_dte' />
                  <input style={{width: '100%'}} type='date' id='process_dte' />
                </div>
              </div>
              <div style={{marginTop: '16px'}}>
                <label htmlFor='creation_dte'>Creation Date</label>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '20px',marginTop: '8px'}}>
                  <input style={{width: '100%'}} type='date' id='creation_dte' />
                  <input style={{width: '100%'}} type='date' id='creation_dte' />
                </div>
              </div>
              
            </RangeInputWrapper>
       
        </InputContainer>
        <ButtonContainer>
            <Button onClick={handleApplyClick}>Apply</Button>
            <Button onClick={onClose}>Cancel</Button>
        </ButtonContainer>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default Popup;