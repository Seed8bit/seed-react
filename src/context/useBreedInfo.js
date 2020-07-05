import {useState, useEffect} from 'react';
import {getBreedInfo} from '../api/breedInfoApi';

const useBreedInfo = (initialQuery) => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [breedInfo, setBreedInfo] = useState({});

  useEffect(() => {
    setLoading(true);
    setHasError(false);
    const fetchData = async () => {
      try {
        const breedInfoResponse = await getBreedInfo(query);
        setBreedInfo(breedInfoResponse.data);
      } catch (error) {
        console.log(error);
        setHasError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [query]);

  return [{breedInfo, loading, hasError}, setQuery];
};

export {useBreedInfo};
