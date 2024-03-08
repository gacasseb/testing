//FILTRA AS DATA NO INTERVALO DE TEMPO DAS VARIAVEIS
function getDatesUntil(data, endDate) {
  let betweenDates = [];
  data.forEach((d) => {
    let date = new Date(+d.timestamp * 1000);
    if (date <= endDate) {
      betweenDates.push({
        ...d,
        date,
      });
    }
  });
  return betweenDates;
}

// BUSCA AS INFOS NA API E RETORNA FORMATADO
export const fetchDates = async (startDate, endDate, currency) => {
  let now = new Date();
  let diff = Math.abs(now - startDate);
  let totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  const url = `https://economia.awesomeapi.com.br/json/daily/${currency}/${totalDays}`;
  const response = await fetch(url);
  if (!response.ok) return false;
  let data = await response.json();

  let getDatesBetween = getDatesUntil(data, endDate);
  getDatesBetween.sort((a, b) => a.date - b.date);

  return getDatesBetween;
};

//FORMATA AS CATEGORIAS
export const getCategories = (dates) => {
  return dates.map((date) => {
    let dateObj = new Date(+date.timestamp * 1000);
    let day = ("0" + dateObj.getDate()).slice(-2);
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let year = dateObj.getFullYear().toString().substr(2);

    return `${day}-${month}-${year}`;
  });
};

//RENDERIZA OS VALORES 
export const getValues = (dates) => {
  return dates.map((date) => date.bid);
};
