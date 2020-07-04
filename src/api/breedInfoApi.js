import API from "./API";

const endpoint = `/info`;

const getBreedInfo = async (queryPara) => {
  const { vegeName } = queryPara;
  try {
    const response = await API.get(
      `${endpoint}?vegeName=${vegeName}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export default { getBreed };