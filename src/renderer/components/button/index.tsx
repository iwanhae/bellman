import React, { forwardRef, PropsWithChildren } from "react";
import {
  Button as ReakitButton,
  ButtonProps as ReakitButtonProps,
} from "reakit";
import { BaseProps, Size, Variant } from "@components/button/types";
import styled, { css } from "styled-components";

const buttonSize: Readonly<Record<Size, { fontSize: number; height: number }>> =
  {
    sm: {
      fontSize: 12,
      height: 24,
    },
    md: {
      fontSize: 14,
      height: 30,
    },
  };

const getButtonStyles = (variant: Variant) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: ${({ theme }) => theme.button.primary};
        color: ${({ theme }) => theme.text.primary};
        border: 1px solid ${({ theme }) => theme.border.primary};
      `;
    case "smoke":
      return css`
        background-color: ${({ theme }) => theme.button.smoke};
        color: ${({ theme }) => theme.text.bold};
        border: 1px solid ${({ theme }) => theme.border.smoke};
      `;
    case "white":
      return css`
        background-color: ${({ theme }) => theme.button.white};
        color: ${({ theme }) => theme.text.plain};
        border: 1px solid ${({ theme }) => theme.border.white};
      `;
    default:
      return css`
        padding: 0;
        color: ${({ theme }) => theme.text.smoke};
      `;
  }
};

export type ButtonProps = Partial<BaseProps> & ReakitButtonProps;

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    { children, variant = "default", size = "sm", ...rest },
    ref
  ): JSX.Element => {
    return (
      <StyledButton ref={ref} variant={variant} size={size} {...rest}>
        {children}
      </StyledButton>
    );
  }
);

export default Button;

const StyledButton = styled(ReakitButton)<BaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  white-space: nowrap;

  font-size: ${({ size }) => buttonSize[size].fontSize}px;
  font-weight: 500;
  border-radius: 4px;

  height: ${({ size }) => buttonSize[size].height}px;
  line-height: ${({ size }) => buttonSize[size].height}px;

  ${({ variant }) => getButtonStyles(variant)};

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;
