import { useEffect, useState } from "react";

import { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import Diary from "./components/Diary";
import DiaryForm from "./components/DiaryForm";
import "./index.css";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const getDiariesFromServer = async () => {
      const data = await getAllDiaries();
      setDiaries(data);
    };

    getDiariesFromServer();
  }, []);

  const addDiary = async (diary: NewDiaryEntry) => {
    const createdDiary = await createDiary(diary);
    setDiaries(diaries.concat(createdDiary));
  };

  return (
    <div>
      <DiaryForm addDiary={addDiary} />
      <h3>Diary entries</h3>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default App;
