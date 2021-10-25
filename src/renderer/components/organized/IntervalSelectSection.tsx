import React, { useCallback, MouseEvent, useMemo } from "react";
import { useAppContext } from "@components/Context";
import { Nullable } from "@library/global";
import { defaultIntervalOptions, Interval } from "@library/settings/interval";
import styled from "styled-components";
import ReactSelect from "@components/ReactSelect";
import useIpcListener from "@hooks/useIpcListener";

interface Props {
  settings: Nullable<Interval>;
}

const { electronOnly } = window;

const IntervalSelectSection = ({ settings }: Props): JSX.Element => {
  const { setSettings } = useAppContext();

  const options = useMemo(() => [...defaultIntervalOptions], []);
  const selectedValue = options
    .map((option) => option.value)
    .find((minutes) => minutes === settings?.value);

  const title = useMemo(() => {
    return "알람 간격";
  }, []);

  const selectContents = useMemo(() => {
    if (settings === null) {
      return "select...";
    }
    return <>{settings.title}</>;
  }, [settings]);

  const onOptionChange = useCallback(
    (event: Event, interval: Interval) => {
      setSettings((prev) => {
        return { ...prev, interval };
      });
    },
    [setSettings]
  );

  const onSelectHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      electronOnly.showIntervalOptions({
        options: options.map((option) => {
          return {
            title: option.title,
            value: option.value,
            checked: option.value === selectedValue,
          };
        }),
      });
    },
    [options, selectedValue]
  );

  useIpcListener({
    channel: "request-change-interval-option",
    listener: onOptionChange,
  });

  return (
    <Section>
      <Title>{title}</Title>
      <ReactSelect onSelect={onSelectHandler}>{selectContents}</ReactSelect>
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

export default IntervalSelectSection;
