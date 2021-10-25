import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  FormEvent,
  MouseEvent,
  useMemo,
} from "react";
import { PopoverStateReturn } from "reakit/Popover";
import {
  Exercise,
  ExerciseCourse,
  ExerciseOptions,
  ExerciseSubmitType,
} from "@library/settings/exercise";
import PlusIcon from "@icons/PlusCourseIcon";
import ReactSelect from "@components/ReactSelect";
import Input from "@components/Input";
import Button from "@components/button";
import Popover, { PopOverProps } from "@components/Popover";
import styled from "styled-components";
import useIpcListener from "@hooks/useIpcListener";

type Props = {
  usePopoverStateProps: PopoverStateReturn;
  options: Readonly<ExerciseOptions[]>;
  onSubmitHandler: (course: ExerciseSubmitType) => void;
  initialInputValue?: string;
  initialExercise?: ExerciseCourse;
} & PopOverProps;

const { electronOnly } = window;

const CourseEditPopover = ({
  usePopoverStateProps: popover,
  options,
  onSubmitHandler,
  initialInputValue,
  initialExercise,
  ...rest
}: Props): JSX.Element => {
  const [course, setCourse] = useState<ExerciseOptions | undefined>(
    initialExercise
  );
  const [inputValue, setValue] = useState<string>(initialInputValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/[^0-9]/g, ""));
  }, []);

  const selectedCourse = options.find(
    ({ exercise }) => exercise === course?.exercise
  )?.exerciseName;

  const selectInnerContents = useMemo(() => {
    if (!selectedCourse) {
      return <></>;
    }
    return <>{selectedCourse}</>;
  }, [selectedCourse]);

  // todo: handling edit course information;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (course === undefined) {
      return;
    }

    onSubmitHandler({
      exercise: course.exercise,
      exerciseName: course.exerciseName,
      repeat: Number(inputValue),
    });

    popover.hide();
  };

  const onSelectHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      electronOnly.showDropdownOptions({
        options: options.map(({ exerciseName, exercise }) => {
          return {
            title: exerciseName,
            value: exercise,
            checked: exercise === selectedCourse,
          };
        }),
        channelName: "request-change-course",
      });
    },
    [options, selectedCourse]
  );

  const onCourseChange = useCallback(
    (
      event: Event,
      props: {
        title: string;
        value: string;
      }
    ) => {
      setCourse({
        exercise: props.value as Exercise,
        exerciseName: props.title,
      });
    },
    []
  );

  useIpcListener({
    channel: "request-change-course",
    listener: onCourseChange,
  });

  // todo: Form.tsx로 일부기능 옮기기?

  return (
    <Popover
      aria-label="select course"
      usePopoverStateProps={popover}
      disclosure={
        <Button size="sm" disabled={disabled}>
          <PlusIcon size={24} />
        </Button>
      }
    >
      <Form onSubmit={onSubmit}>
        <ReactSelect onSelect={onSelectHandler}>
          {selectInnerContents}
        </ReactSelect>
        <Input
          autoComplete="off"
          placeholder="횟수(1~99)"
          ref={inputRef}
          value={inputValue}
          onChange={onInputChange}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={
            inputValue.length === 0 ||
            course === undefined ||
            Number(inputValue) <= 0 ||
            Number(inputValue) > 99
          }
        >
          Add Course
        </Button>
      </Form>
    </Popover>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default CourseEditPopover;
