import styled from "styled-components";

const DashboardContainer = styled.div`
    width: fit;
    flex: 1;
    padding: 0px 20px;
    overflow-y: scroll;
    
`;
const DashboardContent = styled.div`
    display: flex;
    height: fit;
    justify-content: space-between;
    align-items: start;
    padding: 20px 0;
    padding-bottom: 45px;
    gap: 20px;
`;
const DashboardLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 70%;
`;
const DashboardRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 30%;
`;
const DashboardHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const DashboardHeading = styled.h2`
    font-size: 18px;
    margin-bottom: 1px;
    font-weight: bold;
`;
const DashboardSubHeading = styled.p`
    font-size: 13px;
    margin: 0;
    font-weight: semi-bold;
    color: #99999;
`;


export  {DashboardContainer, DashboardHeading, DashboardSubHeading, DashboardHeaderWrapper, DashboardLeft, DashboardRight, DashboardContent};