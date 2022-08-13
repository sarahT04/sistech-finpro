const API_URL = 'https://swapi.dev/api/people?page=';

export const getApiDatas = async ({ pageParam = 1 }) => {
  const data = await fetch(API_URL + pageParam);
  return data.json();
};
export const dateToEnUsString = (dateString) => new Date(dateString).toLocaleDateString('en-US');

export const getPageParamFromString = (string) => Number(string?.split('=')[1]);
