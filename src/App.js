import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './services/components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zip, setZip] = useState('97214');
  const [query, setQuery] = useState('');

  // TODO -- add state for zip / search and add event listeners to the inputs

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setTimeout(setLoading(false), 5000);
    };
    fetchData();
  }, []);
  // TODO -- add event for button click to handle calling fetchBusinesses with zip / search
  const handleSubmit = async () => {
    setLoading(true);
    const data = await fetchBusinesses(zip, query);
    setBusinesses(data);
    setTimeout(setLoading((false), 5000));
  };

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input type="text" placeholder="zip" onChange={(e) => setZip(e.target.value)}/>
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <button onClick={handleSubmit}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses?.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;
