import React, { useState } from "react";
import Popup from "../Popup/Popup";
import {HeaderWrapper, Logo, IconWrapper, Icon, FilterIcon, CogIcon, UserIcon} from "./styledComponent";

const Header = (props) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // props.onFilterChange("hello")

   

    const handleFilterIconClick = () => {
        setIsPopupOpen(true);
      };
    
    const SingleInputs = [
        { id: 'msg_type', label: 'Message Type', type: 'text' },
        { id: 'msg_status', label: 'Message Status', type: 'text' },
        { id: 'currency', label: 'Currency', type: 'text' },
    ];

    const RangeInputs = [
      { id: 'amount_from', label: 'Amount', type: 'text', placeholder: 'Min' },
      { id: 'amount_to', label: '', type: 'text', placeholder: 'Max' },
      { id: 'processing_dte_from', label: 'Processing Date', type: 'date', placeholder: 'From' },
      { id: 'processing_dte_to', label: '', type: 'date', placeholder: 'To' },
      { id: 'create_dte_from', label: 'Creation Date', type: 'date', placeholder: 'From' },
      { id: 'create_dte_to', label: '', type: 'date', placeholder: 'To' }
    ]

  return (
    <HeaderWrapper>
      <Logo src={props.logo} alt="Company Logo" />
      <IconWrapper>
        <Icon>
          <FilterIcon onClick={handleFilterIconClick} title="Filter" />
        </Icon>
        <Icon>
          <CogIcon title="Settings" />
        </Icon>
        <Icon>
          <UserIcon title="User Profile" />
        </Icon>
      </IconWrapper>
      {isPopupOpen && <Popup title="FILTER" SingleInputs={SingleInputs} onClose={() => setIsPopupOpen(false)} onFilterChange={props.onFilterChange}/>}
    </HeaderWrapper>
  );
};

export default Header;
