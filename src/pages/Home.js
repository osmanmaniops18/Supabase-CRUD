import { useState } from "react"
import supabase from "../config/supabaseClient"
import { useEffect } from "react"
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [error,setError]=useState(null)
  const [data,setData] = useState(null)

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

}, [])

  return (
    <div className="page home">
      {error && (<p>{error}</p>)}
      {data && (
        <div className="smoothies">
          {/* order-by buttons */}
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