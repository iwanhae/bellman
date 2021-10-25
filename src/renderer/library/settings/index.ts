import { Nullable } from "@library/global";
import { ExerciseCourse } from "@library/settings/exercise";
import { Interval } from "@library/settings/interval";

export interface Settings {
  interval: Nullable<Interval>;
  playSound: boolean;
  courses: ExerciseCourse[];
}

export const defaultSettings = {
  interval: null,
  playSound: false,
  courses: [],
};
