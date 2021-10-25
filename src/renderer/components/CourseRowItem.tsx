import React, { memo } from "react";
import { ExerciseCourse } from "@library/settings/exercise";
import { usePopoverState } from "reakit/Popover";
import styled from "styled-components";
import Button from "@components/button";

interface Props {
  emoji?: string;
  course: ExerciseCourse;
}

const CourseRowItem = ({ emoji, course }: Props): JSX.Element => {
  const popover = usePopoverState({ placement: "bottom" });

  return (
    <>
      <Item variant="white" size="md">
        <Left>💪</Left>
        <ItemSummary>
          {course.exerciseName} | ({course.repeat}회반복)
        </ItemSummary>
      </Item>
      {/* <CourseEditPopover */}
      {/*  usePopoverStateProps={popover} */}
      {/*  options={} */}
      {/*  onSubmitHandler={} */}
      {/*  initialExercise={} */}
      {/*  initialInputValue={} */}
      {/* /> */}
    </>
  );
};

const Item = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Left = styled.div`
  flex: 0 0 auto;
  padding-right: 8px;
`;

const ItemSummary = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-align: left;
  color: ${({ theme }) => theme.text.plain};
  margin: 0;
`;

export default memo(CourseRowItem);
