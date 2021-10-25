import React, { useCallback } from "react";
import { usePopoverState } from "reakit/Popover";
import { useAppContext } from "@components/Context";
import { ExerciseCourse, ExerciseSubmitType } from "@library/settings/exercise";
import { getUniqueId } from "@library/utils";
import styled from "styled-components";
import CourseEditPopover from "@components/CourseEditPopover";
import CourseRowItem from "@components/CourseRowItem";

interface Props {
  courses: ExerciseCourse[];
}

const CourseDetailSection = ({ courses }: Props): JSX.Element => {
  const { settings, pushCourse, defaultCourseOptions } = useAppContext();
  const props = usePopoverState({ placement: "bottom-end" });

  const onSubmitHandler = useCallback(
    ({ exercise, exerciseName, repeat }: ExerciseSubmitType) => {
      pushCourse({
        id: getUniqueId(),
        exercise,
        exerciseName,
        repeat,
      });
    },
    [pushCourse]
  );

  // todo: to CourseItem.tsx
  // const onEditCourseHandler = useCallback(
  //   (id: string, edited: ExerciseSubmitType) => {
  //     updateCourse(id, edited);
  //   },
  //   [updateCourse]
  // );

  return (
    <FlexFull>
      <Top>
        <Title>코스선택</Title>
        <CourseEditPopover
          usePopoverStateProps={props}
          options={defaultCourseOptions}
          disabled={settings.courses.length >= 1}
          onSubmitHandler={onSubmitHandler}
        />
      </Top>
      <Contents>
        {/* todo: CourseEditPopover 를 갖고있는 CourseItem.tsx */}
        {courses.map((course) => (
          <CourseRowItem key={course.id} course={course} />
        ))}
      </Contents>
    </FlexFull>
  );
};

const FlexFull = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme.text.bold};
`;

const Contents = styled.div`
  padding: 8px 12px;
`;

export default CourseDetailSection;
