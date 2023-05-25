
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  padding-left: 8px;
  width: fit-content;
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 12px;
  font-weight: 700;
`;

const Select = styled.select`
  padding: 2px;
  outline:none;
  background: #f9f9f9;
  border-radius: 3px;
  font-size: 12px;
`;

function Filter() {
  // const [branch, setBranch] = useState('');
  // const [application, setApplication] = useState('');
  // const [paymentType, setPaymentType] = useState('');
  // const [messagwType, setMessageType] = useState('');

  // const handleBranchChange = (event) => {
  //   setBranch(event.target.value);
  // };

  // const handleApplicationChange = (event) => {
  //   setApplication(event.target.value);
  // };

  // const handlePaymentTypeChange = (event) => {
  //   setPaymentType(event.target.value);
  // };
  // const handleMessageTypeChange = (event) => {
  //   setPaymentType(event.target.value);
  // };

  return (
    <FilterContainer>
      <div>
        <Label htmlFor="branch">Branch:</Label>
        <Select id="branch">
          <option value="">All</option>
          <option value="branch1">Branch 1</option>
          <option value="branch2">Branch 2</option>
          <option value="branch3">Branch 3</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="application">Application:</Label>
        <Select id="application" >
          <option value="">All</option>
          <option value="application1">LoanIQ</option>
          <option value="application2">MUREX</option>
          <option value="application3">TI+</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="paymentType">Payment Type:</Label>
        <Select id="paymentType" >
          <option value="">All</option>
          <option value="paymentType1">SWIFT GPI</option>
          <option value="paymentType2">SWIFT</option>
          <option value="paymentType3">FTS</option>
          <option value="paymentType3">SARIE</option>
        </Select>
      </div>
    </FilterContainer>
  );
}

export default Filter;
