import styled from "styled-components";

const Button = styled.button`
  padding: 5px 8px;
  border: 1px solid #005296;
  background-color: #ffffff;
  color: #000;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #005296;
    color: #ffffff;
  }
`;
 export default Button;