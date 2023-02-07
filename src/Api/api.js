import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const login = async (data) => {
  const res = await axios.post(`${BASE_URL}/users/login`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const signup = async (data) => {
  const res = await axios.post(`${BASE_URL}/users/signup`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const calculateRate = async (data) => {
  const res = await axios.post(`${BASE_URL}/slab/calculate`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return res;
};

export const getDiffernce = async () => {
  const res = await axios.get(`${BASE_URL}/slab/calculations`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return res;
};

export const getDetails = async () => {
  const res = await axios.get(`${BASE_URL}/slab/details`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return res;
};

export const getAllSlab = async () => {
  const res = await axios.get(`${BASE_URL}/slab/get`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return res;
};

export const getYearlyGraph = async (year = "") => {
  const res = await axios.get(`${BASE_URL}/slab/graph`, {
    params: { year },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return res;
};
