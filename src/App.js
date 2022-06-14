import React, { useState } from "react";
import "./App.css";
import { useNamesQuery } from "./api/api";
import ReactPaginate from 'react-paginate';

function App() {
  const { data, error, isLoading, isSuccess } = useNamesQuery();
  const [info , setInfo] = useState()
  
  const handleClick = (no) => {
    let result = data.results[no].name;
    setInfo(result)
  }
  
  return (
    <div className="App">
      <div className="List">
        <h1>Episode Names</h1>
        {isLoading && <h2>...loading</h2>}
        {error && <h2>Something went wrong!</h2>}
        {isSuccess && (
          <div>
            {data.results.map((episode) => (
              <div key={episode.id}>
                <span>--:-:--:-:-</span>
                <div key={episode.id} onClick={()=>handleClick(episode.id - 1)} >
                  {episode.id} - <span style={{color:'blue'}}>{episode.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="Display">
        <em>{info}</em>
      </div> 
    </div>
  );
}

export default App;
