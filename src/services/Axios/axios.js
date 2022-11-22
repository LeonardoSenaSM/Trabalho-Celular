import axios from "axios";

const api = axios.create({
  baseURL: "https://online-movie-database.p.rapidapi.com/auto-complete",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "X-RapidAPI-Key": "b4cbef8de4msh78e0966fda7147cp1f039djsn88e311510ff3",
    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
  },
});

export default api;
