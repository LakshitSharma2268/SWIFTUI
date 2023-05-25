import React, { useState } from "react";
import { Resizable } from "react-resizable";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 10px;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  margin-right: -5px;
  cursor: col-resize;
`;

const ResizableTh = ({
  width,
  height,
  onResize,
  onResizeStop,
  children,
  ...rest
}) => (
  <Th {...rest}>
    <Resizable
      width={width}
      height={height}
      onResize={onResize}
      onResizeStop={onResizeStop}
      draggableOpts={{ enableUserSelectHack: false }}
      handle={<ResizeHandle />}
    >
      {children}
    </Resizable>
  </Th>
);

const ResizableTable = ({ columns, data }) => {
  const [columnWidths, setColumnWidths] = useState(
    columns.map((column) => ({ width: 150, minWidth: 50 }))
  );

  const handleResize = (index) => (event, { size }) => {
    setColumnWidths((prevColumnWidths) => {
      const newColumnWidths = [...prevColumnWidths];
      newColumnWidths[index] = {
        width: size.width,
        minWidth: prevColumnWidths[index].minWidth,
      };
      return newColumnWidths;
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <ResizableTh
              key={column.key}
              width={columnWidths[index].width}
              height={40}
              onResize={handleResize(index)}
              onResizeStop={handleResize(index)}
            >
              {column.name}
            </ResizableTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <Td key={column.key}>{row[column.key]}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResizableTable;
