import React, { PropsWithChildren, MouseEvent } from "react";
import Button, { ButtonProps } from "@components/button";
import styled from "styled-components";
import DropdownIcon from "@icons/DropdownIcon";

type ReactSelectProps = {
  onSelect: (e: MouseEvent<HTMLButtonElement>) => void;
} & ButtonProps;

const ReactSelect = ({
  onSelect,
  children,
  ...props
}: PropsWithChildren<ReactSelectProps>): JSX.Element => {
  // todo: ReactSelect.tsx 에서 onSelect 를 정의하는게 좋을거같음, IntervalSelectSection 이 너무 비대한듯
  return (
    <ButtonSelect variant="white" size="md" {...props} onClick={onSelect}>
      <Message>{children}</Message>
      <IconWrap>
        <DropdownIcon />
      </IconWrap>
    </ButtonSelect>
  );
};

const ButtonSelect = styled(Button)`
  justify-content: space-between;
  min-width: 96px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  padding-left: 3px;
  padding-right: 6px;
  color: ${({ theme }) => theme.text.plain};
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.text.plain};
`;

export default ReactSelect;
