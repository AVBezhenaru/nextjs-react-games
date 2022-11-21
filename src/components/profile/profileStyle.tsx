import styled from "styled-components";

export const Section = styled.section`
  font-family: Inter, sans-serif;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  height: auto;
  background: #F5F5F5;
  overflow-x: hidden;
  overflow-y: hidden;
`

export const DivPage = styled.div`
  align-items: stretch;
  padding-top: 75px;    
  min-height: 100vh;
  height: auto;
`

export const SideBar = styled.div`
  display: block;
  z-index: 888;
  position: fixed;
  top: 65px;
  width: 170px;
  height: calc(100vh - 75px);
  padding: 10px 32px 20px 0;
  border-right: 1px solid #F2F2F2;
  background-color: #fff;
`
export const Page = styled.div`
  
  display: flex;
  gap: 40px;
  margin-left: 240px;
  transition: all 0.25s linear;
  position: relative;
  margin-top: 50px;
  margin-bottom: 50px;
  overflow-y: hidden;
`

export const  BlockLeft = styled.div`
  width: 800px;
`

export const DivImgBack =styled.div`
  height: 280px;
  padding: 10px;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 30px;
  
`
export const  ImgBack = styled.div`
  background-color: rgba(255, 127, 57, 0.2);
  height: 100%;
  text-align: center;
  border-radius: 10px;

`

export const DivProfileNav =styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  height:60px;
  border-radius: 10px;
  padding-left: 30px;
  background-color: white;
  margin-bottom: 30px;
`

export const DivComments =styled.div`
  background-color: white;
  min-height: 270px;
  padding: 35px;
  border-radius: 10px;
`

export const AddComments =styled.div`
  
`
export const P =styled.p`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #F2F2F2;
`
export const Textarea = styled.textarea`
  resize: none;
  background-color: rgba(217, 217, 217, 0.15);
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
  outline: none;
  padding: 10px 15px;
  width: 100%;
  height: 168px;
  border: 1px solid rgba(234, 234, 234, 0.51);
`;

export const Button = styled.button`
  font-weight: 600;
  color: gray;
  width: auto;
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
  height: 60px;
  
  
  :focus{
    border-bottom: 1px solid #fe3d3d;
    color: black;
  }
`

export const  BlockRight = styled.div`
  width: 240px;
`
export const  User = styled.div`
  height: 140px;
  text-align: center;
  padding: 40px 0;
`
export const  UserStatic = styled.div`
  height: 80px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;

`
export const  Follower = styled.div`
  padding: 20px 15px 15px 15px;
  border-right: 1px solid #F2F2F2;
  width: 50%;
  text-align: center;
  font-size: 14px;
`
export const  Posts = styled.div`
  padding: 20px 15px 15px 15px;
  width: 50%;
  text-align: center;
  font-size: 14px;

`

export const InputBtnUser = styled.button`
  height: 70px;
  width: 100%;
  border: none;
  outline: none;
  padding: 15px 12px 14px 12px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
   color: #e85a19;
  background-color: white;
  border-radius: 10px;
  
  :hover{
    color: white;
    background-color: #e85a19;
    outline: none;
  }
`

export const H3 = styled.h3`
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #F2F2F2;
`

export const DivProfileInfo =styled.div`
  width: 100%;
  height: 370px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 30px;
`
