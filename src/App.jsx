import './App.css'
import useSWR from 'swr'
import axios from 'axios'
const fetcher = url => axios.get(url).then(res => res.data)

function App() {
  const {data, isLoading, mutate} = useSWR('https://pokeapi.co/api/v2/pokemon/1', fetcher, {
    revalidateOnFocus: false
  })
  
  if (isLoading) return <div>loading...</div>

  return (
    <>
       <h1>SWR</h1>
        <h2>{data.name}</h2>
        <img src={data.sprites.front_default} alt={data.name} />
        <button
          onClick={async () => {
            const newPokemon = Math.floor(Math.random() * 100) + 1;
            const { data: newData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newPokemon}`)
            mutate({ ...data, ...newData}, false)
          }}
        >New pokemon</button>
    </>
  )
}

export default App
