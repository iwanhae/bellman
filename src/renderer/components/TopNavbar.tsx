import React, { useCallback, useMemo } from "react";
import { getFormattedDate } from "@library/utils";
import { useAppContext } from "@components/Context";
import { PathRawName, PathType } from "@library/path";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/button";
import Setting from "@icons/SettingIcon";
import ArrowLeft from "@icons/ArrowLeftIcon";

const Destination: Readonly<Record<PathType, PathRawName>> = {
  main: "/settings",
  settings: "/",
};

const TopNavbar = (): JSX.Element => {
  const { push } = useHistory();
  const { pathName } = useAppContext();
  const dateFormatted = useMemo(() => getFormattedDate(), []);

  const changeLocation = useCallback(() => {
    push(Destination[pathName]);
  }, [pathName, push]);

  const buttonIcon = useMemo(() => {
    switch (pathName) {
      case "main":
        return <Setting />;
      case "settings":
        return <ArrowLeft />;
      default:
        return <></>;
    }
  }, [pathName]);

  return (
    <StyledHeader>
      <Button onClick={changeLocation}>{buttonIcon}</Button>
      <DateArea>
        <time>{dateFormatted}</time>
      </DateArea>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

const DateArea = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  user-select: none;

  border-radius: 4px;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.border.white};
  background-color: ${({ theme }) => theme.button.white};
  color: ${({ theme }) => theme.text.plain};
`;

export default TopNavbar;
