import type { SubmitEventsParam } from "../types";
import { axiosInstance } from "./axios";

export const getPositionSummary = async () => {
  const response = await axiosInstance.get("/positions");
  return response.data;
};

export const submitEvents = async (data: SubmitEventsParam) => {
  const response = await axiosInstance.post("/events", data);
  return response.data;
};
