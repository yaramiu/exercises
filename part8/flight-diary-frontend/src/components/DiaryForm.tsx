import React, { useState } from "react";

import { NewDiaryEntry, Weather, Visibility } from "../types";

const DiaryForm = ({
  addDiary,
}: {
  addDiary: (object: NewDiaryEntry) => Promise<void>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleDiaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    addDiary({
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={handleDiaryCreation}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
