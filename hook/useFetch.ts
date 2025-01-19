import { useState, useEffect } from "react";


const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result: T = await response.json();
          setData(result);
        } catch (err: any) {
          console.error('Fetch error:', err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, isLoading, error };
  };

  export default useFetch;
  