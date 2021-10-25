import React, { useCallback } from "react";
import { useAppContext } from "@components/Context";
import styled from "styled-components";
import Checkbox from "@components/Checkbox";

interface Props {
  settings: boolean;
}

const CheckboxSection = ({ settings: checked }: Props): JSX.Element => {
  const { setSettings } = useAppContext();

  const onChangeHandler = useCallback(() => {
    setSettings((prev) => {
      return { ...prev, playSound: !prev.playSound };
    });
  }, [setSettings]);

  return (
    <Section>
      <Title>사운드 출력</Title>
      <Checkbox checked={checked} onChange={onChangeHandler} />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.bold};
  margin: 0;
`;

export default CheckboxSection;
