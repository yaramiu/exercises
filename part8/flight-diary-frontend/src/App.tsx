import { useEffect, useState } from "react";

import { NonSensitiveDiaryEntry } from "./types";
import { getAllDiaries } from "./diaryService";
import "./index.css";

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const getDiariesFromServer = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };

    getDiariesFromServer();
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
