export const convertObjectToStringRecord = ({
  obj,
}: {
  obj: Record<string, any>;
}) => {
  const result: Record<string, string> = {};
  for (const key in obj) {
    result[key] = obj[key].toString();
  }
  const queryParams = new URLSearchParams(result).toString();
  return queryParams;
};

export const fetchAndParse = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};
