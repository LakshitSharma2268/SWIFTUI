import styled from 'styled-components';
import { FaRedoAlt, FaSistrix } from 'react-icons/fa';
import {AiFillPrinter, AiFillFilePdf} from 'react-icons/ai';
import {BsFillClipboard2Fill, BsFillClipboard2CheckFill} from 'react-icons/bs';
import {FiMoreHorizontal} from 'react-icons/fi';
import {RiCloseLine} from 'react-icons/ri';


const TableWrapper = styled.div`
  margin: 12px 12px 0 12px;
  font-size: 13px;
  width: auto;
overflow-x: scroll;
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
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 10px;
`;
const SearchInput = styled.input`
  padding: 5px 10px;
  border-radius: 3px;
  width: 235px;
  border: 1px #bbb solid;
  font-size:13px;
  outline:none;
  position: relative;
  transition: all .1s ease-in-out;
  &:focus{
    border: 1.5px #005296 solid;
  }
`;

const SearchIcon = styled(FaSistrix)`
  position: absolute;
  right: 85px;
  top: 7px;
  font-size: 13px;
`;

const RefreshIcon = styled(FaRedoAlt)`
  font-size: 13px;
  cursor:  pointer;
  transition: all .2s ease-in-out;
  &:hover{
    color: #005296;
  }
`;
const TableElement = styled.table`
width:max-content;
border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #F3F4F6;
`;

const TableHeaderRow = styled.tr`
  border: 1px solid #ddd;
`;

const TableHeaderCell = styled.th`
padding: 8px 20px 8px 20px;
font-size: 11px;
text-align: left;
overflow: hidden;
white-space: nowrap;
border-right: 3px #ddd solid;
position: relative;
text-overflow: ellipsis;
width: ${({ width }) => width};
cursor: ${({ isResizing, isHovering }) =>
  isResizing ? 'col-resize' : isHovering ? 'col-resize' : 'default'};

&:not(:last-child) {
  user-select: none; /* Prevent text selection */
}

`;

const TableBody = styled.tbody`
  
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  
  &:nth-child(odd){
    background-color: #fff;
    &:hover{
      background: #ddd;
    }
  }
  &:nth-child(even){
    &:hover{
      background: #ddd;
    }
  }
`;

const TableCell = styled.td`
padding: 5px 20px 5px 20px;
font-size: 12px;
max-width: 110px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

&:first-child{
  text-align: center;
  width: 20px;
  &:hover{
    overflow: visible;
    border: none;
    background: none;
  }
}
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin:12px;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  margin: 0 4px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all .2s ease-in-out;
  
  &:hover {
    background-color: #005296;
    color: #fff;
  }

  &:disabled {
    background-color: #f7f7f7;
    color: #999;
    border-color: #ddd;
    cursor: default;
  }
`;

const TableData = styled.td`
  
`;

const ResendWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ResendCheckbox = styled.input`
  margin-right: 5px;
  margin-top:8px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
`;


const Popup = styled.div`
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
padding: 0 20px 10px 20px;
max-height: 400px;
border-radius: 5px;
width: 50%;
`;

const PopupHeader = styled.div`
  margin: 0;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items:end;
  border-bottom: 1px #ccc solid;
  margin-bottom: 0;
  padding-bottom: 5px;
  font-weight: bold;
  background: white;
  position: sticky;
  height: 30px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const PopupHeaderLogo = styled.img`
  width: 100px;
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

const PopupFooterContainer = styled.div`
  width: 100%;
  height: 30px;
  background: white;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #ddd;
`;

const CopyToClipboard = styled(BsFillClipboard2Fill)`
  font-size: 17px;
  cursor:  pointer;
  transition: all .2s ease-in-out;
  &:hover{
    color: #005296;
  }
`;
const CopyToClipboardCheck = styled(BsFillClipboard2CheckFill)`
  font-size: 17px;
  color: #005296;
`;

const ExportPdf = styled(AiFillFilePdf)`
font-size: 18px;
  cursor:  pointer;
  transition: all .2s ease-in-out;
  &:hover{
    color: #005296;
  }
`;

const MessageContainer = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding-top: 10px;
  gap: 50px;
  overflow-y: scroll;
  height: 300px;
  

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

const Message = styled.p`
 font-size: 12px;
 width: fit-content;
 height: fit-content;
 color: #000;
 font-weight: 600;
 text-align: justify;
 margin:0;
`;


const DropdownMenu = styled.div`
  position: absolute;
  z-index: 1;
  width: 100px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const MenuItem = styled.div`
  padding: 8px;
  cursor: pointer;
  text-align: left;
  background-color: ${({ isClicked }) => (isClicked ? '#f2f2f2' : 'transparent')};
  color: ${({ isClicked }) => (isClicked ? '#005296' : '#000000')};

  &:hover {
    background-color: ${({ isClicked }) => (isClicked ? '#f2f2f2' : '#f2f2f2')};
    color: #005296
  }
`;

const ThreeDots = styled(FiMoreHorizontal)`
  position: relative;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  color: #444;
  border-radius: 50%;
  transition: all .3s ease-in-out; 
  &:active {
    top: 1px;
    background: #005296;
    padding: 2px;
  }

`;

const PrintIcon = styled(AiFillPrinter)`
  font-size: 18px;
  cursor:  pointer;
  transition: all .2s ease-in-out;
  &:hover{
    color: #005296;
  }
`;

export {TableWrapper, SearchWrapper, SearchInput, RefreshIcon, TableElement, TableHeader, TableHeaderRow, TableHeaderCell, TableBody, TableRow, TableCell, PaginationWrapper, PaginationButton, ResendWrapper, ResendCheckbox, SubmitButton, TableData, SearchIcon, Popup, PopupContainer, PopupHeader, PopupHeaderLogo, CloseWrap, CloseButton, PopupFooterContainer, CopyToClipboard, ExportPdf, MessageContainer, Message, DropdownMenu, MenuItem, ThreeDots, PrintIcon, CopyToClipboardCheck};