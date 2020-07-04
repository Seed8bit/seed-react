import axios from 'axios';

// const apiStage = process.env.REACT_APP_STAGE
//   ? process.env.REACT_APP_STAGE
//   : "prod";

// const baseURL = process.env.REACT_APP_API_URL
//   ? process.env.REACT_APP_API_URL
//   : `https://happydevstarter.azurewebsites.net/${apiStage}/v1`;

export default axios.create();
