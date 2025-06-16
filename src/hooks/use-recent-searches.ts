import { useEffect, useState } from "react";

export interface RecentSearch {
  id: string;
  locationName: string;
  placeId: string;
  startDate?: string;
  endDate?: string;
  adult?: number;
  kid?: number;
  infant?: number;
  pet?: number;
  timestamp: number;
}

const STORAGE_KEY = "recent-searches";
const MAX_SEARCHES = 4;
const EXPIRY_DAYS = 30;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  //* Load recent searches from localStorage
  useEffect(() => {
    const loadSearches = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData) as RecentSearch[];

          //* Filter out expired searches (older than 30 days)
          const now = Date.now();
          const validSearches = parsedData.filter(
            (search) =>
              now - search.timestamp < EXPIRY_DAYS * 24 * 60 * 60 * 1000
          );

          setRecentSearches(validSearches);
        }
      } catch (error) {
        console.error("Error loading recent searches:", error);
        setRecentSearches([]);
      }
    };

    loadSearches();
  }, []);

  //* Add a new search to recent searches
  const addRecentSearch = (search: Omit<RecentSearch, "id" | "timestamp">) => {
    setRecentSearches((prevSearches) => {
      //* Create new search with ID and timestamp
      const newSearch: RecentSearch = {
        ...search,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };

      //* Remove any existing search with the same placeId
      const filteredSearches = prevSearches.filter(
        (s) => s.placeId !== search.placeId
      );

      //* Add new search to the beginning and limit to MAX_SEARCHES
      const updatedSearches = [newSearch, ...filteredSearches].slice(
        0,
        MAX_SEARCHES
      );

      //* Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));

      return updatedSearches;
    });
  };

  return { recentSearches, addRecentSearch };
}
