import { NonSensitiveDiaryEntry } from "../types";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

export default Diary;
