import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppStates, Result } from "@library/types";
import { useLocation } from "react-router-dom";
import { PathMap, PathRawName } from "@library/path";
import { loadStorage, saveStorage } from "@library/storage";
import { StorageKeys } from "@library/storage/types";
import { defaultSettings, Settings } from "@library/settings";
import {
  defaultExerciseOptions,
  ExerciseCourse,
  ExerciseSubmitType,
} from "@library/settings/exercise";
import { defaultIntervalOptions } from "@library/settings/interval";

export const AppContext = createContext<AppStates | null>(null);

const initialSettings = {
  ...defaultSettings,
  ...loadStorage(StorageKeys.Settings),
};

export const AppContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const pathName = PathMap[location.pathname as PathRawName];

  // todo: handling isActivated value;
  const [isActivated, setActivated] = useState<boolean>(false);

  const [settings, setSettings] = useState<Settings>(initialSettings);

  // todo: handling result value;
  const [result, setResult] = useState<Result[]>([]);

  const pushCourse = useCallback((course: ExerciseCourse) => {
    setSettings((prev) => {
      return { ...prev, courses: [...prev.courses, course] };
    });
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setSettings((prev) => {
      return {
        ...prev,
        courses: [...prev.courses].filter((course) => course.id !== id),
      };
    });
  }, []);

  const updateCourse = useCallback((id: string, edited: ExerciseSubmitType) => {
    setSettings((prev) => {
      return {
        ...prev,
        courses: [
          ...prev.courses.map((course) =>
            course.id === id
              ? {
                  ...course,
                  exercise: edited.exercise,
                  exerciseName: edited.exerciseName,
                  repeat: edited.repeat,
                }
              : course
          ),
        ],
      };
    });
  }, []);

  useEffect(() => {
    saveStorage(StorageKeys.Settings, settings);
  }, [settings]);

  useEffect(() => {
    saveStorage(StorageKeys.Results, result);
  }, [result]);

  const courseOptions = useMemo(() => [...defaultExerciseOptions], []);

  const intervalOptions = useMemo(() => [...defaultIntervalOptions], []);

  return (
    <AppContext.Provider
      value={{
        pathName,
        isActivated,
        settings,
        defaultCourseOptions: courseOptions,
        defaultIntervalOptions: intervalOptions,
        result,
        setSettings,
        pushCourse,
        updateCourse,
        deleteCourse,
        setResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const store = useContext(AppContext);
  if (!store) {
    throw new Error("AppContext is missing");
  }
  return store;
};
