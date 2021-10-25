import React from "react";
import {
  CheckboxProps as ReakitCheckboxProps,
  Checkbox as ReakitCheckbox,
} from "reakit/Checkbox";
import styled from "styled-components";

export type CheckboxProps = Omit<ReakitCheckboxProps, "setState" | "state">;

const Checkbox = (props: CheckboxProps): JSX.Element => {
  return <StyledCheckbox {...props} />;
};

const StyledCheckbox = styled(ReakitCheckbox)`
  width: 16px;
  height: 16px;
  margin: 0 3px;
`;

export default Checkbox;
