import React, { useState, useRef, useEffect} from 'react';
import {TableWrapper, SearchWrapper, SearchInput, RefreshIcon, TableElement, TableHeader, TableHeaderRow, TableHeaderCell, TableBody, TableRow, TableCell, PaginationWrapper, PaginationButton, SearchIcon,  Popup, PopupContainer, PopupHeader, PopupHeaderLogo, CloseWrap, CloseButton, PopupFooterContainer, CopyToClipboard, ExportPdf, MessageContainer, Message, DropdownMenu, MenuItem, ThreeDots, PrintIcon, CopyToClipboardCheck} from "./styledComponents";
import jsPDF from 'jspdf';
import styled from 'styled-components';
import Filter from '../../Dashboard/Filter';
import logo from '../../../images/logo.png';
import useAPI from '../../../API';
import {MdOutlineError, MdPauseCircle} from 'react-icons/md';
import {AiOutlineRight} from 'react-icons/ai';
import HistoryTable from '../History';
import {BiColumns} from 'react-icons/bi';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  gap: 10px;
`;

const ToggleColumn = styled(BiColumns)`
font-size: 17px;
cursor:  pointer;
transition: all .2s ease-in-out;
&:hover{
  color: #005296;
}
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

const SubMenu = styled.ul`
  position: absolute;
  top: 0;
  left: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0px 3px 3px 3px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const SubMenuItem = styled.li`
padding: 8px;
cursor: pointer;
text-align: left;
&:hover {
  background-color: #f2f2f2;
  color: #005296;
}
`;

const ErrorIcon = styled(MdOutlineError)`
  font-size: 13px;
  color: #ff0000;
  transiotion: all .2s ease-in-out;
  &:hover{
    font-size: 14px;
  }
`;

const HoldIcon = styled(MdPauseCircle)`
  font-size: 13px;
  color: #F39C12;
  transiotion: all .2s ease-in-out;
  &:hover{
    font-size: 14px;
  }
`;

const ResizeHandleDiv = styled.div`
  width: 4px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  cursor: col-resize;
  background-color: #005296;
  z-index: 1;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;
  gap: 10px;
  z-index: 1;
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

const SortableTable = ({ columns, data , infData , totalData, filter}) => {
  // console.log('Interface Data -- ',infData)
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilterPage, setFiltertCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);
  const [dataHistory, setDataHistory] = useState();
  const [columnHistory, setColumnHistory] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  

 

 //calculating range

 const allfilterData = filter ? filter.split(",") : "";
  const [dataCpy, setDataCpy] = useState(totalData);
  // setDataCpy(filter ? totalData.filter((rows) => {
  //   return rows.messageType === allfilterData[0];
  // }) : totalData)
 console.log("checking--",allfilterData,dataCpy)
  //all dynamic branch coming from API
  let [branchCodes, setBranchCodes] = useState((totalData.map(item => item.branchCode)).filter((item, index) => {
    return (totalData.map(item => item.branchCode)).indexOf(item) === index;
  }))
  let [paymentTypes, setPaymentTypes] = useState((totalData.map(item => item.paymentType)).filter((item, index) => {
    return (totalData.map(item => item.paymentType)).indexOf(item) === index;
  }))
  
  const [popupText, setPopupText] = useState('');
  const [popupHead, setPopupHead] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
  // const [refer, setRefer] = useState(ref);
  

  const [branch, setBranch] = useState('');
  const [application, setApplication] = useState('');
  const [paymentType, setPaymentType] = useState('');

//   const filterdData =  displayData ?  displayData.filter((row) =>
//   Object.values(row).some(
//     (value) => value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
//   )
//  ) : data.filter((row) =>
//  Object.values(row).some(
//    (value) => value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
//  )
// );

//work when any header level filter is applied or not


// if(filter){
//   const allfilterData = filter.split(",") ;
//   console.log("values-- ",allfilterData)
//   setDataCpy(totalData.filter((rows) => {
//     return rows.messageType === allfilterData[0] ;
//   })) 
// }
    const handleBranchChange = (event) => {
     
  
    setBranch(event.target.value);
   
    if(paymentType === "ALL" || paymentType === ""){
         setDataCpy(event.target.value === "ALL" ? totalData : (totalData.filter((rows) => {
          return rows.branchCode === event.target.value ;
        })));
    }
    else{
      if(!(paymentType === "ALL" || paymentType === "") && event.target.value === "ALL"){
        setDataCpy( (totalData.filter((rows) => {
          return rows.paymentType === paymentType;
        })));
        return
      }
      setDataCpy(event.target.value === "ALL" ? totalData : (totalData.filter((rows) => {
        return rows.branchCode === event.target.value && rows.paymentType === paymentType;
      })));
     

  }
  };

  const handleApplicationChange = (event) => {
    setApplication(event.target.value);
    
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value );
  
    if(branch === "ALL" || branch === ""){
      setDataCpy(event.target.value === "ALL" ? totalData : (totalData.filter((rows) => {
        return rows.paymentType === event.target.value ;
      })));
    }else{
      if(!(branch === "ALL" || branch === "") && event.target.value === "ALL"){
        setDataCpy( (totalData.filter((rows) => {
          return rows.branchCode === branch;
        })));
        return
      }
      setDataCpy(event.target.value === "ALL" ?  totalData : (totalData.filter((rows) => {
        return rows.paymentType === event.target.value && rows.branchCode === branch;
      })));
  }
  };




  const handleIconClick = (rowIndex) => {
    if (menuIndex === rowIndex) {
      setMenuIndex(null);
    } else {
      setMenuIndex(rowIndex);
    }
  };

  
  const handleMenuClick = async (option,ref_no) => {
    const  getData =  async (url) =>{ 
      return  await fetch(url)
      .then((response) => {
        return response.json();
    })
  
  }
  const encodedString = encodeURIComponent(ref_no);
  let message = await getData("http://localhost:8000/req/sourceMessageOutput/"+encodedString);
  // const commaIndex = message[0].outputMessage.replace(/:/g, ':,').indexOf(",", 5) + 1;
  // const stringData =  message[0].outputMessage.replace(/:/g, ':,')
  // const formattedString =  message[0].outputMessage.replace(/:/g, ':,')
  // const formattedString = stringData.substring(0, commaIndex) + stringData.substring(commaIndex).split(',').map((item, index) => (
  //     <React.Fragment key={index}>
  //       {item.trim()}
  //       {index !== stringData.length - 1 && <br />}
  //     </React.Fragment>
  // ));
  
  // const formattedString = message[0].outputMessage
  // const formattedString = message[0].outputMessage.replace(/}/g, '},').split(',').map((item, index) => (
  //   <React.Fragment key={index}>
  //     {item.trim()}
  //     {index !== message[0].outputMessage.length - 1 && <br />}
  //   </React.Fragment>

  // ));

  //pre code
  console.log('dddd---',message)
   const formattedString = message[0].outputMessage.split('\r\n').map((item, index) => (
      <React.Fragment key={index}>
        {item.trim()}
        {index !== message[0].outputMessage.length - 1 && <br />}
      </React.Fragment>
  
    ));
   
    //pre code
    //testing
      // let messageData =   infData.find(rows => rows.outputSourceId === ref_no)
      // console.log('dddd---',messageData)
      // const formattedString = messageData['outputMessage'].split('\r\n').map((item, index) => (
      //       <React.Fragment key={index}>
      //         {item.trim()}
      //         {index !== message[0].outputMessage.length - 1 && <br />}
      //       </React.Fragment>
        
      //     ));
    //testing
  console.log("Interface -- ",formattedString)
  if(option === 'ackNack'){
      const dataFilter = infData.filter(row=>{
        return row.outputSourceId === ref_no
      })
      const formattedString = dataFilter[0].messageAckNack ? dataFilter[0].messageAckNack.split('\r\n').map((item, index) => (
        <React.Fragment key={index}>
          {item.trim()}
          {index !== dataFilter[0].messageAckNack - 1 && <br />}
        </React.Fragment>
    
      )) : null;
      console.log("Ack -",formattedString )
      setPopupText(
        <Message ref={messageRef}>{formattedString != null ? formattedString : "no message found"}
        </Message>);
        setPopupHead("Ack/Nack");
         setPopupVisible(true);
    setMenuIndex(null);
    return;
    
     }
     if(option === 'History'){
      const dataFilter = infData.filter(row=>{
        return row.outputSourceId === ref_no
      })

      console.log("History",dataFilter)
      return;
     }
    if(option === 'Both Messages'){
      const sourceMessgaeById = totalData.filter(row=>{
        return row.liqOutputMessageId == ref_no 
      })
      
      const sourceMessage =  `121 - Unique End-to-End Transaction ${sourceMessgaeById[0].uetrCode}^
      20 - Transaction Reference No.: * ^
      21 - Related Reference: * ^
      23B - Bank Operation Code: ${sourceMessgaeById[0].bankOperationCode} ^
      32A - Amount: ${sourceMessgaeById[0].outputTotalAmount} ^
      32A - Currency: ${sourceMessgaeById[0].currencyCode} ^
      32A - Value Date: ${sourceMessgaeById[0].valueDate} ^
      52A - Ordering Institution Role: ^
      53A - Senders Correspondent: *^
      54A - Receivers Correspondent: *^
      56A - Intermediary: ADEIUS55XXX; *^
      57A - Account with Institution: *^
      59 - Beneficiary Customer: * ^
      70 - Details of Payment: ${sourceMessgaeById[0].paymentDetails} ^
      71A - Details of Charges: ${sourceMessgaeById[0].detailsChargesCode} ^
      72 - Sender to Receiver Info: ${sourceMessgaeById[0].sdrRvrTx} ^
      Branch: ${sourceMessgaeById[0].branchCode} ^
      Business Date: ${sourceMessgaeById[0].businessDate} ^
      Cashflow ID ${sourceMessgaeById[0].cashflowId}^
      Funds Credited Same Day ${sourceMessgaeById[0].sdayFundsIndicator} ^
      IMT Message Type: ${sourceMessgaeById[0].messageType} ^
      Ordering Customer Field: ${sourceMessgaeById[0].uetrCode} ^
      Ordering Customer Role: *^
      Owner ID ${sourceMessgaeById[0].ownerId} ^
      Owner Type ${sourceMessgaeById[0].ownerType} ^
      Queue Status: ${sourceMessgaeById[0].queueStatCode} ^
      Receiver:  *^
      Sender: *^
      Service: ${sourceMessgaeById[0].serviceCode} `
      const formattedStringSource = sourceMessage.split('^').map((item, index) => (
        <React.Fragment key={index}>
          {item.trim()}
          {index !== sourceMessage.length - 1 && <br />}
        </React.Fragment>
    
      ));
      setPopupText(
        <>
        <Message ref={messageRef}>{formattedStringSource}</Message>
        <Message ref={messageRef}>{formattedString}</Message>
        </>
      );
    }else if(option === 'Loan IQ Message'){
      //testing
      const sourceMessgaeById = totalData.filter(row=>{
        return row.liqOutputMessageId == ref_no 
      })
      
      const sourceMessage =  `121 - Unique End-to-End Transaction ${sourceMessgaeById[0].uetrCode}^
      20 - Transaction Reference No.: * ^
      21 - Related Reference: * ^
      23B - Bank Operation Code: ${sourceMessgaeById[0].bankOperationCode} ^
      32A - Amount: ${sourceMessgaeById[0].outputTotalAmount} ^
      32A - Currency: ${sourceMessgaeById[0].currencyCode} ^
      32A - Value Date: ${sourceMessgaeById[0].valueDate} ^
      52A - Ordering Institution Role: ^
      53A - Senders Correspondent: *^
      54A - Receivers Correspondent: *^
      56A - Intermediary: ADEIUS55XXX; *^
      57A - Account with Institution: *^
      59 - Beneficiary Customer: * ^
      70 - Details of Payment: ${sourceMessgaeById[0].paymentDetails} ^
      71A - Details of Charges: ${sourceMessgaeById[0].detailsChargesCode} ^
      72 - Sender to Receiver Info: ${sourceMessgaeById[0].sdrRvrTx} ^
      Branch: ${sourceMessgaeById[0].branchCode} ^
      Business Date: ${sourceMessgaeById[0].businessDate} ^
      Cashflow ID ${sourceMessgaeById[0].cashflowId}^
      Funds Credited Same Day ${sourceMessgaeById[0].sdayFundsIndicator} ^
      IMT Message Type: ${sourceMessgaeById[0].messageType} ^
      Ordering Customer Field: ${sourceMessgaeById[0].uetrCode} ^
      Ordering Customer Role: *^
      Owner ID ${sourceMessgaeById[0].ownerId} ^
      Owner Type ${sourceMessgaeById[0].ownerType} ^
      Queue Status: ${sourceMessgaeById[0].queueStatCode} ^
      Receiver:  *^
      Sender: *^
      Service: ${sourceMessgaeById[0].serviceCode} `
      const formattedString = sourceMessage.split('^').map((item, index) => (
        <React.Fragment key={index}>
          {item.trim()}
          {index !== sourceMessage.length - 1 && <br />}
        </React.Fragment>
    
      ));
   
      //testing
      // console.log("source--",sourceMessage)
      setPopupText(
      <Message ref={messageRef}>
       {formattedString}
      </Message>);
    }else{
      setPopupText(
      <Message ref={messageRef}>{formattedString ? formattedString : "no message found"}
      </Message>);
    }
    setPopupHead(`${option}`);
    setPopupVisible(true);
    setMenuIndex(null);
  };
  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  
  // Sort data based on current sort column and direction

  const sortedData = dataCpy.sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    if (valueA === valueB) {
      return 0;
    }
    if (sortDirection === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // reset to first page when searching
  };
   const filterdData =  dataCpy.filter((row) =>
   Object.values(row).some(
   (value) => value != null ? value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 : ""
   )).filter(filter ? (rows) => {
      return rows.messageType === allfilterData[0];
   }:(rows) => {return rows})
 
const handleRefresh = () => {
  
  setTableData(dataCpy);
}
const startIndex = (currentPage - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
  // Calculate total pages
const totalPages =   Math.ceil(dataCpy.length / rowsPerPage) ;

console.log('total paged', totalPages)
  // Calculate range of page numbers to display
  const maxDisplayPages = 5;
  const startPage =  Math.max(1,currentPage - Math.floor(maxDisplayPages / 2));
  // startPage = Math.max(1, startPage);
  const endPage = Math.min(totalPages,startPage + maxDisplayPages - 1);
  console.log('start total paged', startPage)
console.log('end total paged', endPage)
  // console.log('start current',currentPage)
  // console.log('start end', startPage,endPage );
  // endPage = Math.min(totalPages, endPage);

  // Generate page number buttons
  const pageButtons = [];
  // const generatePageButtons = () =>{
  
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <PaginationButton key={i} disabled={currentPage === i } onClick={() => setCurrentPage(i)}>
        {i}
      </PaginationButton>
    );
  }
// }
// generatePageButtons();
  // Calculate data range to display
  
  const displayData = filterdData.slice(startIndex, endIndex);
  
  
  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setFiltertCurrentPage(pageNumber);
  };

// Printing whole table
  const handlePrintClick = () => {
    const tableHtml = document.getElementById("table").outerHTML;
    const printWindow = window.open("", "");
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
            font-size: 13px;
          }
        
          th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid black;
          }
        
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${tableHtml}
      </body>
    </html>
    `);
    printWindow.print();
  };

  
// copy to clipboard in popup window

const messageRef = useRef(null);
const [icon, setIcon] = useState(<CopyToClipboard />);

const handleCopy = () => {
  const messageText = messageRef.current.innerText;
  navigator.clipboard.writeText(messageText);

  setIcon(<CopyToClipboardCheck />);
  setTimeout(() => setIcon(<CopyToClipboard />), 2000);
};

//Printing messages
  const handleMessagePrintClick = () =>{
    const text = messageRef.current.innerText;
    const printWindow = window.open("", "Print Message");
    printWindow.document.write(text);
    printWindow.print();
  }

// Exporting message as PDF
  const handleExportToPDF = () => {
    const doc = new jsPDF({lineHeight: 2});
    const text = messageRef.current.innerText;
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
    doc.text(splitText, 10, 20);
    doc.save(new Date().getTime()+'.pdf');
    
  }  
 
  const [visibleColumns, setVisibleColumns] = useState(() => {
    
    return columns.reduce((obj, column) => {
      obj[column.key] = true;
      return obj;
    }, {});
  });

  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };
  const [isColumnToggleOpen, setIsColumnToggleOpen] = useState(false);

  const toggleDropdown = () => {
    setIsColumnToggleOpen(!isColumnToggleOpen);
  };

  //getting reference
  const fatchApi = async (url) =>{
    const response = await fetch(url);
    return await response.json();
  } 
  const getRef = (ref_no)=>{
    return  ref_no

  }
  //
  const showAllinterfaceData = (liqRid) =>{
    const dataFilter = infData.filter(row=>{
      return row.outputSourceId === liqRid
    })
    return dataFilter
  }
  //interface data
  const showinterfaceData = (columnData,liqRid) =>{
   
    let dataFilter = infData.find(rows => rows.outputSourceId === liqRid)

    return typeof dataFilter === 'undefined' ? "" :  dataFilter[columnData] 
  }

    // popup disapaear
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsColumnToggleOpen(false);
      setMenuIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  //History popup
  const [showHistory, setShowHistory] = useState(false);
  const handleHistoryClick = (ref_no) => {
    setColumnHistory([
      { name: "Output Message ID", key: "outputMessageId" },
      // { name: "Message Format ID", key: "messageFormatId" },
      { name: "Message Type ID", key: "messageTypeId" },
      { name: "Output Source ID", key: "outputSourceId" },
      { name: "Output Message", key: "outputMessage" },
      { name: "Message Status", key: "messageStatus" },
      // { name: "Sequence Message Sent", key: "sequenceMessageSent" },
      { name: "Date Message Sent", key: "dateMessageSent" },
      { name: "Creation User ID", key: "createUserId" },
      // { name: "Updation User ID", key: "updateUserId" },
      { name: "Creation TimeStamp", key: "createTimeStamp" },
      { name: "Update TimeStamp", key: "updateTimeStamp" },
      // { name: "Create Country", key: "createCountry" },
      // { name: "	Update Country", key: "updateCountry" },
      // { name: "Creation Location", key: "createLocation" },

      // { name: "Creation User IP", key: "createIp" },
      // { name: "Updation User IP", key: "updateIp" },
      // { name: "update User Location", key: "updateLocation" },
      
      
    ]);
    setDataHistory(infData.filter(row=>{
      return row.outputSourceId === ref_no
    }))
    if((infData.filter(row=>{
      return row.outputSourceId === ref_no
    })).length === 0){
      alert("History not available for RID : "+ref_no);
      return;
    }
    setShowHistory(true);
  };
  const handleCloseHistory = () => {
    setShowHistory(false);
  };

  // Submenu
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  const [clickedOption, setClickedOption] = useState(false);
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
    setClickedOption(!clickedOption);
  };

  // Resizing column
const tableRef = useRef(null);
const [columnWidths, setColumnWidths] = useState({});
const [resizingColumn, setResizingColumn] = useState(null);
const [resizeStartX, setResizeStartX] = useState(0);
const [resizeColumnWidth, setResizeColumnWidth] = useState(0);
const [isResizing, setIsResizing] = useState(false);
const [isHovering, setIsHovering] = useState(null);
const [border, setBorder] = useState(false);

useEffect(() => {
  const handleResizeMove = (e) => {
    const widthDiff = e.clientX - resizeStartX;
    const newWidth = Math.max(resizeColumnWidth + widthDiff, 0); // Minimum width of 100px

    const newColumnWidths = { ...columnWidths };
    newColumnWidths[resizingColumn] = newWidth;

    setColumnWidths(newColumnWidths);
  };

  const handleResizeEnd = () => {
    setResizingColumn(null);
    setResizeStartX(0);
    setResizeColumnWidth(0);

    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  if (resizingColumn) {
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  }

  return () => {
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };
}, [columnWidths, resizingColumn, resizeStartX, resizeColumnWidth]);

const handleResizeStart = (e, column) => {
  e.preventDefault(); // Prevent text selection during resizing

  const { width, right } = e.target.getBoundingClientRect();
  const borderPosition = right - e.clientX;

  // Only allow resizing when clicking on the right border area (10px threshold)
  if (borderPosition <= 10) {
    setResizingColumn(column);
    setResizeStartX(e.clientX);
    setResizeColumnWidth(width);
    setIsResizing(true);
    setBorder(true);
  }
};

const handleHover = (column, e) => {
  if (resizingColumn !== column) {
    const { right } = e.target.getBoundingClientRect();
    const borderPosition = right - e.clientX;

    setIsHovering(borderPosition <= 10 ? column : null);
  }
};
const handleHoverOut = () => {
  setIsHovering(null);
  setIsResizing(false);
};

const getColumnWidth = (column) => {
  const columnWidth = columnWidths[column];
  return columnWidth ? `${columnWidth}px` : 'auto';
};


const handleSort = (columnName) => {
  if (!isResizing) {
     // Handle sorting
        if (sortColumn === columnName) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          setSortColumn(columnName);
          setSortDirection('asc');
        }
  }
};


  return (
    <>
{popupVisible && (
        <Popup>
          <PopupContainer>
            <PopupHeader><PopupHeaderLogo src={logo} />{popupHead}<CloseWrap><CloseButton onClick={handlePopupClose}>X</CloseButton></CloseWrap></PopupHeader>
            <MessageContainer>{popupText}</MessageContainer>

            <PopupFooterContainer>
            {popupHead === 'Failed Message' &&(
              <ButtonContainer>
                <Button>Resend</Button>
                <Button onClick={handlePopupClose}>Cancel</Button>
              </ButtonContainer>
            )}
            {popupHead === 'Hold Message' &&(
              <ButtonContainer>
                <Button>Release</Button>
                <Button onClick={handlePopupClose}>Cancel</Button>
              </ButtonContainer>
            )}
            {popupHead === 'Loan IQ Message' &&(
              <>
              <div onClick={handleCopy} title='Copy to clipboard' style={{paddingTop: '3px'}}>
                {icon}
              </div>
              <ExportPdf onClick={handleExportToPDF} title='Export as PDF'/>
              <PrintIcon onClick={handleMessagePrintClick} title='Print'/>
              </>
            )}
            {popupHead === 'Interface Message' &&(
              <>
              <div onClick={handleCopy} title='Copy to clipboard' style={{paddingTop: '3px'}}>
                {icon}
              </div>
              <ExportPdf onClick={handleExportToPDF} title='Export as PDF'/>
              <PrintIcon onClick={handleMessagePrintClick} title='Print'/>
              </>
            )}
            {popupHead === 'Both Messages' &&(
              <>
              <div onClick={handleCopy} title='Copy to clipboard' style={{paddingTop: '3px'}}>
                {icon}
              </div>
              <ExportPdf onClick={handleExportToPDF} title='Export as PDF'/>
              <PrintIcon onClick={handleMessagePrintClick} title='Print'/>
              </>
            )}
            </PopupFooterContainer>
          </PopupContainer>
        </Popup>
      )}
    {showHistory && (
          <HistoryTable columns={columnHistory} data={dataHistory} onClose={handleCloseHistory} />
        )}
    <SearchWrapper>
      {/* <Filter/> */}
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
          {/* <option value="ALL">All</option> */}
          <option value="LOANIQ">Loan IQ</option>
          {/* <option value="Murex">MUREX</option> */}
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
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
        
       <SearchInput type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search" /><SearchIcon/>
       <RefreshIcon onClick={handleRefresh} title="Refresh Table"/>
       <PrintIcon onClick={handlePrintClick} title="Print table" />
       <ToggleColumn onClick={toggleDropdown} title="Toggle Columns" />


      </div>
      {isColumnToggleOpen && (
    <ColumnToggleWrapper ref={dropdownRef}>
        <CheckboxLabel>
          Show Columns:
        </CheckboxLabel>
        <TableColumns>
          {columns.map((column) => (
            <TableColumn key={column.key}>
              <label>
                <input
                  type="checkbox"
                  checked={visibleColumns[column.key]}
                  onChange={() => toggleColumnVisibility(column.key)}
                />
                {column.name}
              </label>
            </TableColumn>
          ))}
        </TableColumns>
      </ColumnToggleWrapper>
    )}
    </SearchWrapper>

    <TableWrapper>
      <TableElement id="table" ref={tableRef}>
      <colgroup>
          {columns.map((column) => (
            <col key={column.key} style={{ width: getColumnWidth(column) }} />
          ))}
        </colgroup>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell style={{minWidth: '10px'}}></TableHeaderCell>
            {columns.map((column) => (
             visibleColumns[column.key] && ( 
             <TableHeaderCell 
                key={column.key} 
                onClick={() => handleSort(column.key)}
                onMouseDown={(e) => handleResizeStart(e, column.key)}
                onMouseMove={(e) => handleHover(column.key, e)}
                onMouseLeave={handleHoverOut}
                width={getColumnWidth(column.key)}
                isResizing={resizingColumn === column.key}
                isHovering={isHovering === column.key}
              >
                {column.name} 
                {sortColumn === column.key && (sortDirection === 'asc' ? '↑' : '↓')}
                {resizingColumn === column.key && <ResizeHandleDiv />}
              </TableHeaderCell>)
            ))}
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {displayData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
               
              
              <TableCell style={{paddingLeft: '15px'}}>
                <ThreeDots  onClick={() => handleIconClick(rowIndex)} title='More Options' />
                {menuIndex === rowIndex && (
                  <DropdownMenu ref={dropdownRef}>
                  <MenuItem onClick={() => toggleSubMenu('Messages')} isClicked={clickedOption}style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>Messages <AiOutlineRight style={{fontSize: '10px'}}/></MenuItem>
                  <MenuItem onClick={()=>handleHistoryClick(displayData[rowIndex].liqOutputMessageId)}>History</MenuItem>
                  {clickedOption && (
                  <SubMenu isOpen={isSubMenuOpen}>
                    
                      
                    <SubMenuItem onClick={() => handleMenuClick("Loan IQ Message",displayData[rowIndex].liqOutputMessageId)}>Loan IQ Msgs</SubMenuItem>
                    <SubMenuItem onClick={() => handleMenuClick("Interface Message",displayData[rowIndex].liqOutputMessageId)}>Interface Msgs</SubMenuItem>
                    <SubMenuItem onClick={() => handleMenuClick("Both Messages",displayData[rowIndex].liqOutputMessageId)}>Both Msgs</SubMenuItem>
                    <SubMenuItem onClick={() => handleMenuClick("ackNack",displayData[rowIndex].liqOutputMessageId)}>Ack/Nack</SubMenuItem>
                  </SubMenu>)}
                </DropdownMenu>
                  
                )}
              </TableCell>
             
              {columns.map((column) => {
                if (visibleColumns[column.key]) {
                  
                  if (column.key === 'queueStatCode' && row[column.key] === 'FAIL ') {
                   
                    return (
                      <TableCell key={column.key} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {row[column.key]}
                        <ErrorIcon title='Click For More Info' onClick={() => handleMenuClick("Failed Message",displayData[rowIndex].liqOutputMessageId)}/>
                      </TableCell>
                    );
                  }else if(column.key === 'msg_status' && row[column.key] === 'Hold'){
                    return(
                    <TableCell key={column.key} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {row[column.key]}
                        <HoldIcon title='Click For More Info' onClick={() => handleMenuClick("Hold Message",displayData[rowIndex].liqOutputMessageId)}/>
                      </TableCell>
                      );
                  }else {
                    return (
                      <TableCell key={column.key}>
                        {row[column.key]}
                      </TableCell>
                    );
                  }
                } 
              })}
              
            </TableRow>
          ))}
        </TableBody>
      </TableElement>
      
    </TableWrapper>
      <PaginationWrapper>
        <PaginationButton disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</PaginationButton>
        {pageButtons}
        <PaginationButton disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</PaginationButton>
        
      </PaginationWrapper>
    </>
  );
};

export default SortableTable;
