import styled  from "styled-components";

export const DivSideBar = styled.div`
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

export const Ul= styled.ul`
  list-style: none;
  padding: 0;
`
export const LiHeader= styled.li`
  font-weight: 600 !important;
  margin: 10px 0 10px 30px;
  text-transform: uppercase;
`
export const Li= styled.li`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.66);
  cursor: pointer;
  padding: 10px 0 10px 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;


  :hover {
    background: rgba(244, 97, 25, 0.05);
    color: #F46119;
  }
`