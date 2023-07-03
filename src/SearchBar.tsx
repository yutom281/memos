import React, { useState } from "react";

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    // Perform the search logic here based on the searchTerm
    // For simplicity, let's assume we have some hardcoded search results

    const dummySearchResults: SearchResult[] = [
      {
        id: 1,
        name: "Result 1",
        description: "The first search result",
      },
      {
        id: 2,
        name: "Result 2",
        description: "The second search result",
      },
    ];

    setSearchResults(dummySearchResults);
  };

  return (
    <div>
      <input 
        title="search bar"
        type="text"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); handleSearch() }}
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <strong>{result.name}</strong> - {result.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
