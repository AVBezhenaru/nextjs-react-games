import styled, { css } from 'styled-components';

export enum ButtonTypes {
  Primary = 'primary',
  Text = 'text',
  Gradient = 'gradient',
}

export enum ButtonSizes {
  Large = 'large',
  Normal = 'normal',
  Small = 'small',
}

type ButtonProps = {
  buttonType?: ButtonTypes;
  size?: ButtonSizes;
};

export const Button = styled.button<ButtonProps>`
  ${({ size }) => {
    switch (size) {
      case ButtonSizes.Large:
        return css`
          border-radius: ${({ theme }) => theme.borders.baseRadius};
          padding: 14px 60px;
          font-size: 20px;
        `;
      case ButtonSizes.Normal:
        return css`
          padding: 11px 45px;
          font-size: 18px;
        `;
      case ButtonSizes.Small:
        return css`
          border-radius: ${({ theme }) => theme.borders.smallRadius};
          padding: 8px 30px;
          font-size: 16px;
        `;
    }
  }}

  ${({ buttonType, theme }) => {
    switch (buttonType) {
      case ButtonTypes.Gradient:
        return css`
          background-image: ${theme.gradients.main};
          background-size: 200% auto;

          transition: background-position 0.4s ease-in-out;

          &:hover {
            background-position: 100% 0;
          }
        `;
      case ButtonTypes.Primary:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text};

          transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

          &:hover {
            color: ${theme.colors.primary};
            background-color: ${theme.colors.text};
          }
        `;
      case ButtonTypes.Text:
        return css`
          background-color: transparent;
          color: ${theme.colors.text};

          transition: background-color 0.2s ease-in-out;

          &:hover {
            background: ${theme.colors.transparentGray};
          }
        `;
    }
  }}
`;

Button.defaultProps = {
  buttonType: ButtonTypes.Gradient,
  size: ButtonSizes.Large,
};
