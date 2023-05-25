import React, { useState, useRef, useEffect} from 'react';

import {TableWrapper, SearchWrapper, SearchInput, TableElement, TableHeader, TableHeaderRow, TableHeaderCell, TableBody, TableRow, PrintIcon, CloseButton,PaginationWrapper, PaginationButton,PopupHeaderLogo,CloseWrap} from "./Table/styledComponents";
import styled from 'styled-components';
import logo from '../../images/logo.png';
import {FaSistrix } from 'react-icons/fa';
import {BiColumns} from 'react-icons/bi';

const SearchIcon = styled(FaSistrix)`
  position: absolute;
  right: 65px;
  top: 7px;
  font-size: 13px;
`;
const ToggleColumn = styled(BiColumns)`
font-size: 17px;
cursor:  pointer;
transition: all .2s ease-in-out;
&:hover{
  color: #005296;
}
`;
const TableCell = styled.td`
  padding: 5px 20px 5px 20px;
  font-size: 12px;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover{
    overflow: visible;
    background: white;
    border: 1px #005296 solid;
    max-width: none;
    text-overflow: clip;
  }`;
const CheckboxLabel = styled.label`
  margin-right: 8px;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  padding-bottom: 3px;
  border-bottom: 1px #ddd solid;
`;

const ColumnToggleWrapper = styled.div`
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
const HistoryTableContainer = styled.div`
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
const HistoryTableWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #aaa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 50%;
    height: 400px;
    border-radius: 5px;
    background: white;
    z-index: 99;
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

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 12px 12px 12px;
  font-size: 14px;
  border-bottom: 1px #ccc solid;
  padding-bottom: 5px;
`;

const HistoryTable = ({ columns, data, onClose }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [tableData, setTableData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
    const [menuIndex, setMenuIndex] = useState(null);
  

    const sortedData = data.sort((a, b) => {
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
    };
     const filterdData = data.filter((row) =>
    Object.values(row).some(
      (value) => value.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    )
  );

  
    // Handle sorting
    const handleSort = (columnName) => {
      if (sortColumn === columnName) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(columnName);
        setSortDirection('asc');
      }
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
     // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calculate range of page numbers to display
  const maxDisplayPages = 5;
  let startPage = currentPage - Math.floor(maxDisplayPages / 2);
  startPage = Math.max(1, startPage);
  let endPage = startPage + maxDisplayPages - 1;
  endPage = Math.min(totalPages, endPage);

  // Generate page number buttons
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <PaginationButton key={i} disabled={currentPage === i } onClick={() => setCurrentPage(i)}>
        {i}
      </PaginationButton>
    );
  }

  // Calculate data range to display
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayData = filterdData.slice(startIndex, endIndex);
// Handle pagination
const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
    return (
      <>
      <HistoryTableContainer>
 <HistoryTableWrapper>
  <HistoryHeader>
    <PopupHeaderLogo src={logo} />
    <h3 style={{margin: '0'}}>History</h3>
    <CloseWrap><CloseButton onClick={onClose}/></CloseWrap>
  </HistoryHeader>
      <SearchWrapper>
      <div><h2 style={{margin: '0', fontSize: '13px', paddingLeft: '3px'}}>History for - <span>{data[0].outputSourceId}</span></h2></div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
          
         <SearchInput type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search" /><SearchIcon/>
         
         <PrintIcon onClick={handlePrintClick} title="Print Table" />
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
        <TableElement id="table">
          <TableHeader>
            <TableHeaderRow>
              {columns.map((column) => (
                 visibleColumns[column.key] && (
                <TableHeaderCell key={column.key} onClick={() => handleSort(column.key)}>
                  {column.name} {sortColumn === column.key && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHeaderCell>
                 )
              ))}
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                   visibleColumns[column.key] && (
                  <TableCell key={column.key}>
                    {row[column.key]}
                  </TableCell>
                   )
                ))}
                
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
    
 </HistoryTableWrapper>
 </HistoryTableContainer>
      </>
    );
  };
  
  export default HistoryTable;