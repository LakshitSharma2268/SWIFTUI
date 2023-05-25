import styled from 'styled-components';

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
  z-index: 9999;
`;

const PopupContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
border: 1px solid #aaa;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
z-index: 1;
padding: 10px 12px 0px 12px;
width: 50%;
height: 395px;
border-radius: 5px;
`;

const PopupHeader = styled.h2`
  margin: 0;
  border-bottom: 1px #ccc solid;
  margin-bottom: 10px;
  padding-bottom: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 10px;
  label {
    margin-bottom: 8px;
    font-size: 12px;
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
const ButtonContainer = styled.div`
  width: 100%;
  height: fit-content;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 5px 8px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  margin-top: 10px;
  color: #000;
  border: 1px #005296 solid;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005296;
    color:white;
  }

  &:nth-child(2){
    border: 1px #ed732a solid;
    transition: all 0.3s ease;
    &:hover {
      background-color: #ed732a;
      color:white;
    }
  }
`;

const CloseButton = styled(Button)`
  background-color: white;
  margin-right: 10px;
  &:hover {
    background-color: #ed732a;
    border: 1px #ed732a solid;
  }
`;
 export {PopupWrapper, PopupContainer, PopupHeader, InputWrapper, ButtonContainer, Button, CloseButton};