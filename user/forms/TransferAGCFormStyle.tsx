import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
  margin-top: -5px;
`;

export const Input = styled.input`
  background: rgb(250, 250, 250);
  border: 1px solid #f2f2f2;
  color: #1f2933;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  padding: 10px 10px;
  resize: none;
  border-radius: 5px;
  outline: none;
  width: 140px;
  color: #646464;
  margin-top: 8px;
`;

export const InputBtn = styled.button`
  color: #ffffff;
  border: none;
  outline: none;
  padding: 10px 15px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
  display: inline-block;
  width: 80px;
  position: relative;
  line-height: 16px;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 1s ease-in-out;
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  box-shadow: 0 4px 15px 0 rgb(229 66 10 / 35%);

  :hover {
    color: white;
    transition: All 1s ease;
    background-position: 100% 0;
    outline: none;
  }
`;

export const SpanErrorInput = styled.span`
  display: block;
  color: tomato;
  font-size: 14px;
  width: 140px;
  margin: 5px auto;
`;

export const SpanTitle = styled.span`
  font-size: 14px;
`;
