import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 50px 30px 50px 230px;
  transition: all 0.25s linear;
  position: relative;
  overflow-y: hidden;
`;

export const WalletCard = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 550px;
  height: 100%;
  border-radius: 15px;
  box-shadow:
  webkit-box-shadow: 0px 0px 22px 0px rgba(34, 60, 80, 0.2); 
-moz-box-shadow: 0px 0px 22px 0px rgba(34, 60, 80, 0.2); 
box-shadow: 0px 0px 22px 0px rgba(34, 60, 80, 0.2);
`;

export const Account = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  gap: 15px;
  background-color: white;
  width: 450px;
  color: #646464;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const TopUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  gap: 15px;
  background-color: white;
  width: 450px;
  color: #646464;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  box-shadow: 
  -webkit-box-shadow: -10px 0px 22px 0px rgba(34, 60, 80, 0.2); 
-moz-box-shadow: -10px 0px 22px 0px rgba(34, 60, 80, 0.2); 
box-shadow: -10px 0px 22px 0px rgba(34, 60, 80, 0.2);
`;

export const Transfer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
  gap: 15px;
  background-color: white;
  width: 450px;
  color: #646464;
  border-radius: 15px;
  box-shadow: 
  -webkit-box-shadow: -10px 0px 22px 0px rgba(34, 60, 80, 0.2); 
-moz-box-shadow: -10px 0px 22px 0px rgba(34, 60, 80, 0.2); 
box-shadow: -10px 0px 22px 0px rgba(34, 60, 80, 0.2);
`;

export const TitleCard = styled.div`
  color: #646464;
`;

export const LineCard = styled.div`
  content: '';
  background: #f3f3f3;
  height: 2px;
  width: 100%;
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SpanTitle = styled.span`
  font-size: 14px;
`;

export const SpanValue = styled.span`
  font-size: 18px;
`;
