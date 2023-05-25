import styled from "styled-components";

const NavWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px #ccc solid;
`;

const NavItem = styled.div`
  position: relative;
  padding: 0 20px;
  cursor: pointer;
  height:100%;
  display:flex;
  justify-content: center;
  align-items:center;
  transition: all .2s ease-in-out;
  &:hover {
    border-bottom: 1px solid #005296;
    color: #005296;
  }
  ${(props) =>
    props.active &&
    `
      border-bottom: 1px solid #005296;
      color: #005296;
    `}
`;

const NavItemText = styled.span`
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  font-size: 13px;
`;
const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  z-index: 1;
`;

const NavDropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  font-size: 12px;
  color: #000;
  transition: all .2s ease-in-out;
  &:hover {
    color: #005296;
  }
`;

export {NavWrapper, NavItem, NavItemText, NavDropdown, NavDropdownItem};