import { useState, useEffect, useRef } from 'react';

interface FiltersProps {
  onFilterChange: (filter: string) => void;
}

export const Filters = ({ onFilterChange }: FiltersProps) => {
  const [filterValue, setFilterValue] = useState('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onFilterChange(value);
    }, 300);
  };

  const handleClear = () => {
    setFilterValue('');
    onFilterChange('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center px-6 py-4">
          <div className="flex items-center justify-center w-10 h-10 mr-4 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by interests: music, travel, sports, photography..."
            value={filterValue}
            onChange={handleChange}
            className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-lg focus:outline-none"
          />
          {filterValue && (
            <button
              onClick={handleClear}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
              aria-label="Clear filter"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {filterValue && (
          <div className="px-6 pb-3">
            <div className="text-sm text-gray-500">
              Found for query: <span className="font-semibold text-blue-600">{filterValue}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

