import { useState } from "react"
import supabase from "../config/supabaseClient"
import { useEffect } from "react"
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [error,setError]=useState(null)
  const [data,setData] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = (id) => {
    setData(previousData=>{
      return previousData.filter(item=>item.id!==id)
    
    })
  }


useEffect(() => {

const fetchData=async()=>{
  const {data,error}=await supabase
  .from('to_do_task')
  .select()
  .order(orderBy, {ascending: false})
  if (error) {
    setError("could not fetch data")
    setData(null)
    console.log(error)
  }
  if (data) {
    setData(data)
    setError(null)
  }
}

fetchData()

}, [orderBy])

  return (
    <div className="page home">
      {error && (<p>{error}</p>)}
      {data && (
        <div className="smoothies">
        <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {data.map(item => (
              <SmoothieCard key={item.id} onDelete={handleDelete} smoothie={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home