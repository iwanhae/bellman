import React, { cloneElement, ReactElement, RefAttributes } from "react";
import {
  Popover as ReakitPopover,
  PopoverArrow,
  PopoverDisclosure,
  PopoverOptions,
  PopoverProps,
  PopoverStateReturn,
} from "reakit/Popover";
import styled from "styled-components";

export type PopOverProps = {
  disclosure?: ReactElement & RefAttributes<HTMLButtonElement>;
  usePopoverStateProps: PopoverStateReturn;
} & Omit<PopoverProps, keyof PopoverOptions>;

const Popover = ({
  disclosure,
  children,
  usePopoverStateProps: props,
  ...restProps
}: PopOverProps): JSX.Element => {
  return (
    <>
      {disclosure !== undefined && (
        <PopoverDisclosure
          {...props}
          ref={disclosure.ref}
          {...disclosure.props}
        >
          {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
        </PopoverDisclosure>
      )}
      <StyledPopover tabIndex={0} {...props} {...restProps}>
        <StyledPopoverArrow {...props} />
        {children}
      </StyledPopover>
    </>
  );
};

const StyledPopover = styled(ReakitPopover)`
  width: 90%;
  max-width: 320px;
  background-color: ${({ theme }) => theme.button.white};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border.white};
  padding: 8px;

  z-index: 100;
`;

const StyledPopoverArrow = styled(PopoverArrow)`
  svg {
    .stroke {
      fill: ${({ theme }) => theme.border.smoke};
    }
    .fill {
      fill: ${({ theme }) => theme.layout.subHeader};
    }
  }
`;

export default Popover;
