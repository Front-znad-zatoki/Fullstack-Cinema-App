import { useEffect, useState } from 'react';

const useFetchedData = (url) => {
  const [fetchedData, setFetchedData] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url).then((res) => res.json());
      setFetchedData(data);
    }
    fetchData();
  }, []);
  return fetchedData;
};

export default useFetchedData;
