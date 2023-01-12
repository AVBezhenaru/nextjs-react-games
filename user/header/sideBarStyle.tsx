import styled from 'styled-components';
import Link from 'next/link';

export const DivSideBar = styled.div`
  display: block;
  z-index: 888;
  position: fixed;
  top: 65px;
  width: 202px;
  height: calc(100vh - 65px);
  padding: 10px 32px 20px 0;
  border-right: 1px solid #f2f2f2;
  background-color: #fff;
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 0;

  border-bottom: 1px solid #e4e7eb;
`;
export const LiHeader = styled.li`
  font-weight: 600 !important;
  margin: 10px 0 10px 30px;
  text-transform: uppercase;
  color: #646464;
`;

interface StyledLinkProps {
  pathname?: string;
  active?: string;
}
export const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Li = styled.li<StyledLinkProps>`
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  padding: 9px 0 10px 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  :hover {
    background: rgba(244, 97, 25, 0.05);
    color: #f46119;
  }
  color: ${(props) =>
    (props.active ? props.active.replace('/', '') : '') === props.pathname
      ? '#F46119'
      : 'rgba(0, 0, 0, 0.66)'};
  background: ${(props) =>
    (props.active ? props.active.replace('/', '') : '') === props.pathname
      ? 'rgba(244, 97, 25, 0.05)'
      : 'none'};
`;
