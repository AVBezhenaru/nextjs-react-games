import styled from 'styled-components';

export const StyledSlider = styled.div``;

export const RangeInput = styled.input`
  height: 29px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 11px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 2px 2px 4px #b0b0b0;
    background: #f5ce62;
    border-radius: 50px;
    border: 0px solid #000000;
  }

  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 7px #a1a1a1;
    border: 0px solid #000000;
    height: 22px;
    width: 22px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5.5px;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #f5ce62;
  }

  &::-moz-range-track {
    width: 100%;
    height: 11px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 2px 2px 4px #b0b0b0;
    background: #f5ce62;
    border-radius: 50px;
    border: 0px solid #000000;
  }

  &::-moz-range-thumb {
    box-shadow: 1px 1px 7px #a1a1a1;
    border: 0px solid #000000;
    height: 22px;
    width: 22px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 11px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #f5ce62;
    border: 0px solid #000000;
    border-radius: 100px;
    box-shadow: 2px 2px 4px #b0b0b0;
  }
  &::-ms-fill-upper {
    background: #f5ce62;
    border: 0px solid #000000;
    border-radius: 100px;
    box-shadow: 2px 2px 4px #b0b0b0;
  }
  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 7px #a1a1a1;
    border: 0px solid #000000;
    height: 22px;
    width: 22px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #f5ce62;
  }
  &:focus::-ms-fill-upper {
    background: #f5ce62;
  }
`;

export const RangeMarks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
  }
`;
