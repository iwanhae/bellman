import React from "react";
import { useAppContext } from "@components/Context";
import IntervalSelectSection from "@components/organized/IntervalSelectSection";
import CheckboxSection from "@components/organized/CheckboxSection";
import CourseDetailSection from "@components/organized/CourseDetailSection";

const SettingsRoute = (): JSX.Element => {
  const { settings } = useAppContext();

  return (
    <>
      <IntervalSelectSection settings={settings.interval} />
      <CheckboxSection settings={settings.playSound} />
      <CourseDetailSection courses={settings.courses} />
    </>
  );
};

export default SettingsRoute;
