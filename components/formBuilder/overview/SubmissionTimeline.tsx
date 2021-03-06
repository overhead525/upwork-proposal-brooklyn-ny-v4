import { Line } from "react-chartjs-2";

const atThisMoment = new Date(Date.now());
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = atThisMoment.getDay();
daysOfTheWeek.unshift(...daysOfTheWeek.splice(day, daysOfTheWeek.length - day));
const firstFourDays = daysOfTheWeek.slice(0, day + 1);
const lastThreeDays = daysOfTheWeek.slice(day + 1, daysOfTheWeek.length);

const days = [...lastThreeDays, ...firstFourDays];

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const data2 = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options2 = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export interface SubmissionTimelineProps {
  resultData: number[];
}

export const SubmissionTimeline: React.FC<SubmissionTimelineProps> = ({
  resultData,
}) => {
  const data = {
    labels: days,
    datasets: [
      {
        label: "Submission Count",
        data: resultData,
        fill: true,
        backgroundColor: "rgba(0, 100, 255, 0.3)",
        borderColor: "rgba(0, 50, 255, 1)",
      },
    ],
  };

  return <Line type="line" data={data} options={options} />;
};
