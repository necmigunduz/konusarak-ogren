import React, { useState, useEffect } from "react";
import "./App.css";
import { useNamesQuery } from "./api/api";
import ReactPaginate from 'react-paginate';
import fetchChar from "./api/fetchChars";


function App() {
  const { data: names, error, isLoading, isSuccess } = useNamesQuery();
  const [info , setInfo] = useState();
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  const [result, setResult] = useState();
  const [characters, setCharacters] = useState([]);
  
  const getChar = async (id) => {
    let char = await fetchChar(id)
    return char;
  }
  const handleChars = async (id) => {
    let IDs = [];
    for(let i=0;i<names.results[id].characters.length;i++){
      IDs.push(parseInt(names.results[id].characters[i].split('/')[5]))
    }
    console.log(IDs);
    let chars = []
    for(let i=0; i<IDs.length;i++){
      let char = await getChar(IDs[i]);
      chars.push(char)
    }
    setCharacters(chars)
    console.log(characters)
  };
  const handleClick = (id) => {
    let res = names.results
    const selResult = 
    <>
      <h4>{res[id-1].name}</h4>
      <p><strong>Name:</strong> {res[id-1].name}</p>
      <p><strong>Air Date:</strong> {res[id-1].air_date}</p>
      <p><strong>URL: </strong>{res[id-1].url}</p><br/>
      <div 
        style={{color:'gray', cursor:'pointer'}} 
        onClick={()=>handleChars(res[id].id)}
      >
        Click here to see characters in Episode {res[id-1].id}
      </div>
    </>
    setResult(selResult)
  }
  const getData = async () => {
    let res = await names.results;
    const slice = res.slice(offset, offset + perPage)
    const postData = slice.map(pd => 
    <div key={pd.id}>
      <p>{pd.name}</p>
      <div 
        style={{color:'blue', cursor:'pointer'}} 
        onClick={() => handleClick(pd.id)}
      >See info</div>
    </div>)
    setInfo(postData)
    setPageCount(Math.ceil(res.length/perPage))
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage)
  };
  
  useEffect(() => {
    getData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);  
  
  return (
    <div className="App">
    
      <div className="List">
        <div className="inList">
          <h1>Episode List</h1>
          {isLoading && <h2>...loading</h2>}
          {error && <h2>Something went wrong!</h2>}
          {isSuccess && (
            <div className="success">
              {info}
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="Show">
        {result}
        <ul style={{listStyle:'none', lineHeight:'12px', marginLeft:'-20px'}}>{characters.map((char) => <li style={{fontSize: '10px'}}>{char.name}</li>)}</ul>
      </div>
    </div>
  );
}

export default App;
