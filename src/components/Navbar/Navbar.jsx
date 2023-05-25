import React from "react";
import {NavWrapper, NavItem, NavItemText} from "./styledComponents";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // const [openDropdown, setOpenDropdown] = useState("");

  const location = useLocation();
  const isActive = (url) => {
    return location.pathname === url;
  };

  // const handleDropdownClick = (dropdownName) => {
  //   setOpenDropdown(dropdownName === openDropdown ? "" : dropdownName);
  // };

  return (
    <NavWrapper>
      <Link to="/" style={{ textDecoration: 'none' ,height:'100%'}}>
      <NavItem active={isActive('/')}>
        <NavItemText>Dashboard</NavItemText>
      </NavItem></Link>
      <Link to="/PaymentMessage" style={{ textDecoration: 'none', height:'100%', ':visited': { textDecoration: 'none' } }}>
      <NavItem active={isActive('/PaymentMessage')}>
        <NavItemText>Payment Messages</NavItemText>
        
        {/* <NavDropdown isOpen={openDropdown === "Payment Messages"}>
          <NavDropdownItem>LoanIQ Messages</NavDropdownItem>
          <NavDropdownItem>Service 2</NavDropdownItem>
          <NavDropdownItem>Service 3</NavDropdownItem>
        </NavDropdown> */}
      </NavItem></Link>
    </NavWrapper>
  );
};

export default Navbar;

