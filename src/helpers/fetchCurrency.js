export const fetchCurrency = async (currency) => {
  const url = `https://economia.awesomeapi.com.br/json/last/${currency}`;
  const response = await fetch(url);
  if (!response.ok) return false;
  let data = await response.json();

  return data;
};