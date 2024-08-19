import axios from "axios";

import { NonSensitiveDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};
