import React from 'react'

function FetchData() {
    const [records, setRecords] = useState([])
    useEffect(()=> {
        axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=7ef794b32d8b49a8b7c5c173ec451252&query=pasta&cuisine=italian')
        .then(res => {setRecords(res.data)})
        .catch(err => console.log(err))
    }, [])
    return (
        <p> {title} </p>
    )
}

export default FetchData