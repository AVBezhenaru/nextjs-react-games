import styled from 'styled-components';
import { SizeType } from '../../../../utils/types/sizes';

type BoardContentStyles = {
  size: SizeType;
};

export const StyledBoardContent = styled.div<BoardContentStyles>`
  width: ${({ size }) => size.w}px;
  height: ${({ size }) => size.h}px;
  background: #f5f5f5;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
`;
