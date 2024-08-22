import React, { useState } from "react";
import axios from "axios";

import { NewDiaryEntry, Weather, Visibility } from "../types";
import ErrorMessage from "./ErrorMessage";

const DiaryForm = ({
  addDiary,
}: {
  addDiary: (object: NewDiaryEntry) => Promise<void>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearFormFields = () => {
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");

    const radioButtons =
      document.querySelectorAll<HTMLInputElement>("input[type=radio]");
    radioButtons.forEach((radioButton) => {
      if (radioButton.type === "radio") {
        radioButton.checked = false;
      }
    });
  };

  const handleDiaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await addDiary({
        date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment,
      });
      clearFormFields();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.split(". ")[1]);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <ErrorMessage message={errorMessage} />
      <form onSubmit={handleDiaryCreation}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("great")}
          />
          <label htmlFor="visibility">great</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("good")}
          />
          <label htmlFor="visibility">good</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("ok")}
          />
          <label htmlFor="visibility">ok</label>
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility("poor")}
          />
          <label htmlFor="visibility">poor</label>
        </div>
        <div>
          weather{" "}
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("sunny")}
          />
          <label htmlFor="weather">sunny</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("rainy")}
          />
          <label htmlFor="weather">rainy</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("cloudy")}
          />
          <label htmlFor="weather">cloudy</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("stormy")}
          />
          <label htmlFor="weather">stormy</label>
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather("windy")}
          />
          <label htmlFor="weather">windy</label>
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
