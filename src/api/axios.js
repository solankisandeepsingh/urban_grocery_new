import axios from 'axios';
const BASE_URL = 'https://grocery.intelliatech.in/api-firebase';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'multipart/form-data',
    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAxOTk3ODMsImlzcyI6ImVLYXJ0IiwiZXhwIjoxNjkwMjAxNTgzLCJzdWIiOiJlS2FydCBBdXRoZW50aWNhdGlvbiJ9.YO6vUrMfFdZhaLZS5YFwwlZNGdjOpPrcGGgeSWCw_P8"}
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json',
    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTAxODk4NDEsImlzcyI6ImVLYXJ0IiwiZXhwIjoxNjkwMTkxNjQxLCJzdWIiOiJlS2FydCBBdXRoZW50aWNhdGlvbiJ9.VFHQ8q2VpQp0gSve-Lm9ZPhWAF6AJujHvS5i3OmpqkY"
 }
    // withCredentials: true
});