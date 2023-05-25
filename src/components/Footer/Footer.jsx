import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import {FooterContainer, LeftContainer, UserInfoContainer, UserInfo, DateTimeContainer, DateTime, IconContainer, CompanyName} from "./styledComponents";

const Footer = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <FooterContainer>
      <LeftContainer>
        <UserInfoContainer>
          <FaUserCircle size={15} />
          <UserInfo>Lakshit Sharma</UserInfo>
        </UserInfoContainer>
        <DateTimeContainer>
          <MdDateRange size={15} />
          <DateTime>{currentDate}</DateTime>
          <MdAccessTime size={15} />
          <DateTime>{currentTime}</DateTime>
        </DateTimeContainer>
      </LeftContainer>
      <IconContainer>
        <CompanyName>&#169; 2023, FINEXCORE Software Solutions LLC.</CompanyName>
      </IconContainer>
    </FooterContainer>
  );
};

export default Footer;
