import { useState } from 'react';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Filters } from './components/Filters';
import { Loading } from './components/Loading';
import { MapView } from './components/MapView';
import { useUsers } from './hooks/useUsers';

function App() {
  const [interestFilter, setInterestFilter] = useState('');
  const { users, loading, error, refetch } = useUsers();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-1000 w-full px-4">
        <Filters onFilterChange={setInterestFilter} />
      </div>
      <MapView users={users} interestFilter={interestFilter} />
    </div>
  );
}

export default App;
