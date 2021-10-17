import React from "react";
import { IconProps } from "@icons/types";

export default ({ size = 20 }: IconProps): JSX.Element => {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
      />
    </svg>
  );
};
