import styled from 'styled-components';
import { FaFilter, FaCog, FaUser } from 'react-icons/fa';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 20px;
  height: 50px;
  border-bottom: 1px #ccc solid;
`;

const Logo = styled.img`
  height: 30px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 25%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #005296;

  }
`;

const FilterIcon = styled(FaFilter)`
  font-size: 1em;
`;

const CogIcon = styled(FaCog)`
  font-size: 1em;
`;

const UserIcon = styled(FaUser)`
  font-size: 1em;
`;

export {HeaderWrapper, Logo, IconWrapper, Icon, FilterIcon, CogIcon, UserIcon};