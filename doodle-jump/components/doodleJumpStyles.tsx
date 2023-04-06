import styled from 'styled-components';

export const Doodler = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
`;

export const Grid = styled.div`
  width: 400px;
  height: 600px;
  position: relative;
  margin-top: 100px;
  font-size: 100px;
  text-align: center;
`;

export const BackgroundImg = styled.img`
  z-index: 0;
`;

export const PlatformImg = styled.img`
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
`;

export const DoodlerImg = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  z-index: 3;
  left: 0;
  top: 0;
`;
export const BrokenPlatformImg = styled.img`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
`;

export const Platform = styled.div`
  width: 85px;
  height: 15px;
  z-index: 2;
  position: absolute;
`;

export const BrokenPlatform = styled.div`
  width: 85px;
  height: 15px;
  background-color: saddlebrown;
  position: relative;
`;

export const Score = styled.p`
  font-size: 24px;
  position: absolute;
  color: black;
  top: 40px;
  left: 20px;
`;

export const PlayAgainButton = styled.button`
  position: absolute;
  left: 100px;
  top: 300px;
  width: 200px;
  height: 60px;
  font-size: 32px;
  border: 2px solid black;
  border-radius: 100px;
`;
