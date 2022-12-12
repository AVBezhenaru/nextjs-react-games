import styled from 'styled-components';

export const Section = styled.section`
  position: fixed;
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  background-image: url('https://pro-theme.com/html/teamhost/assets/img/bg-first-screen.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

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

export const DivForm = styled.div`
  position: relative;
  margin: 10% auto;
  padding: 20px;
  max-width: 400px;
  height: 250px;
  background-color: rgba(255, 250, 246, 0.98);
  border-radius: 20px;
`;

export const H1 = styled.h1`
  font-size: 60px;
  color: #ff6927;
  text-align: center;
  margin: 30px 0;
`;

export const P = styled.p`
  display: flex;
  flex-direction: row;
  gap: 50px;
  font-size: 32px;
  color: red;
`;

export const InputBtn = styled.button`
  text-align: center;
  outline: none;
  border: none;
  padding: 20px 0;
  color: #ffffff;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 20px;
  display: inline-block;
  width: 100%;
  position: relative;
  line-height: 16px;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all 0.4s ease-in-out;
  transition: all 1s ease-in-out;
  background-image: linear-gradient(to right, #f5ce62, #e43603, #fa7199, #e85a19);
  box-shadow: 0 4px 15px 0 rgb(229 66 10 / 55%);

  :hover {
    color: white;
    transition: All 1s ease;
    background-position: 100% 0;
    outline: none;
  }
`;
