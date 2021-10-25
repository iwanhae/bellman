export type Exercise = "pushUp" | "squat";

export interface ExerciseCourse {
  id: string;
  exercise: Exercise;
  exerciseName: string;
  repeat: number;
}

export type ExerciseOptions = Omit<ExerciseCourse, "id" | "repeat">;

export type ExerciseSubmitType = Omit<ExerciseCourse, "id">;

export const defaultExerciseOptions: Readonly<ExerciseOptions[]> = [
  {
    exercise: "pushUp",
    exerciseName: "푸쉬업",
  },
  {
    exercise: "squat",
    exerciseName: "스쿼트",
  },
];
