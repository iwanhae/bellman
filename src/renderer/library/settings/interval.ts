export type Interval = {
  title: string;
  value: number;
};

export const defaultIntervalOptions: Readonly<Interval[]> = [
  {
    title: "10분",
    value: 10,
  },
  {
    title: "20분",
    value: 20,
  },
  {
    title: "30분",
    value: 30,
  },
  {
    title: "40분",
    value: 40,
  },
  {
    title: "50분",
    value: 50,
  },
  {
    title: "1시간",
    value: 60,
  },
  {
    title: "2시간",
    value: 120,
  },
  {
    title: "3시간",
    value: 180,
  },
  {
    title: "4시간",
    value: 240,
  },
  {
    title: "6시간",
    value: 360,
  },
];
