import styled, { css } from 'styled-components';

export enum SimpleButtonTypes {
  Default,
  Text,
}

type SimpleButtonProps = {
  buttonType?: SimpleButtonTypes;
};

export const SimpleButton = styled.button<SimpleButtonProps>`
  font-size: 16px;

  padding: 8px 12px;

  border-radius: ${({ theme }) => theme.borders.smallRadius};

  ${({ buttonType, theme }) => {
    switch (buttonType) {
      case SimpleButtonTypes.Default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.primary};

          &:hover {
            background: transparent;
          }
        `;
      case SimpleButtonTypes.Text:
        return css`
          color: ${theme.colors.text};

          &:hover {
            text-decoration: underline;
          }
        `;
    }
  }}
`;

SimpleButton.defaultProps = {
  buttonType: SimpleButtonTypes.Default,
};
