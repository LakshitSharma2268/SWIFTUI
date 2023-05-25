import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: .7rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px #ccc solid;
  height: 8px;
  font-size: 13px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const UserInfo = styled.p`
  margin: 0;
  margin-left: 0.5rem;
`;

const DateTimeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DateTime = styled.p`
  margin: 0;
  margin-left: 0.5rem;
  margin-right:1rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyName = styled.p`
  margin-right: 2rem;
`;

export {FooterContainer, LeftContainer, UserInfoContainer, UserInfo, DateTimeContainer, DateTime, IconContainer, CompanyName};