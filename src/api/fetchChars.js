const fetchChar = async (id) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
        mode: 'cors',
        method: 'GET'
    })
        .then((res)=> res.json());
    return response
}

export default fetchChar;