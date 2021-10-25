import { SetStateAction, Dispatch } from "react";
import { PathType } from "@library/path";
import { Settings } from "@library/settings";
import {
  Exercise,
  ExerciseCourse,
  ExerciseOptions,
  ExerciseSubmitType,
} from "@library/settings/exercise";
import { Interval } from "@library/settings/interval";

export interface AppStates {
  pathName: PathType;
  isActivated: boolean;
  settings: Settings;
  defaultIntervalOptions: Readonly<Interval[]>;
  defaultCourseOptions: Readonly<ExerciseOptions[]>;
  result: Result[];
  setSettings: Dispatch<SetStateAction<Settings>>;
  pushCourse: (course: ExerciseCourse) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (id: string, edited: ExerciseSubmitType) => void;
  setResult: Dispatch<SetStateAction<Result[]>>;
}

export interface Result {
  date: number;
  exercise: Exercise;
  hadSucceeded: boolean;
}
