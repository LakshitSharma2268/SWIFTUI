import React, {useState} from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  width: fit;
  background: #fff;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const Heading = styled.h3`
  margin:0 10px;
  font-size: 12px;
  border-bottom: 1px #bbb solid;
  padding-bottom: 8px;
  margin-bottom: 7px;
  color: #77777;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px #bbb solid;
  border-radius: 10px;
  width: 50%;
  height: fit;
  padding: 15px;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
  border-radius: 4px;
  margin: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.Color};
  margin: 0;
`;

const Number = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  margin: 0;

`;

function StatusCard({ heading, boxes }) {

  
  return (
    <CardContainer>
      <Heading>{heading}</Heading>
      
      <BoxContainer>
      {boxes.map((box, index) => (
          <Box key={index} bgColor={box.bgColor} fontColor={box.fontColor}>
            <TitleWrapper>
              <Title>{box.title}</Title>
            </TitleWrapper>
            <Number>{box.number}</Number>
          </Box>
        
      ))}
      </BoxContainer>
    </CardContainer>
  );
}

export default StatusCard;