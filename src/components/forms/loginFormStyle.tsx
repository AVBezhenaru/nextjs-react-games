import styled from 'styled-components';

export const Section = styled.section`
  font-family: Inter, sans-serif;
  letter-spacing: initial;
  line-height: initial;
  font-weight: initial;
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  border-radius: 6px;
  background-image: url('https://pro-theme.com/html/teamhost/assets/img/bg-first-screen.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  :before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.69);
  }
`;

export const DivImgLogo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ImgLogo = styled.img`
  margin: 0 20px 0 0;
  max-width: 41px;
  height: auto;
  box-sizing: border-box;
`;

export const Span = styled.span`
  background: #fff;
  padding: 0 10px;
`;

export const H4 = styled.h1`
  font-size: 14px;
  color: #e91e63;
  letter-spacing: 3px;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid rgba(218, 218, 218, 0.47);
  line-height: 0.1em;
  margin: 10px 0 60px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 540px;
  padding: 30px 40px;
  border-radius: 10px;
  background: #ffffff;
  margin: 10% auto;
`;
export const Input = styled.input`
  background: rgb(250, 250, 250);
  border: 1px solid #f2f2f2;
  color: #1f2933;
  font-size: 14px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  margin-bottom: 20px;
  padding: 10px 10px;
  resize: none;
  border-radius: 0;
  outline: none;
`;

export const InputBtn = styled.button`
  color: #ffffff;
  border: none;
  outline: none;
  padding: 15px 12px 14px 12px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
  display: inline-block;
  width: 100%;
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

export const P = styled.p`
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

export const PError = styled.p`
  color: red;
`;
