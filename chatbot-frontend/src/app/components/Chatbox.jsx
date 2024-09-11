import axios from 'axios'
import { useState } from 'react'
import PromptMessage from './PromptMessage'
import ResponseMessage from './ResponseMessage'

const Chatbox = () => {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFetchCoinDetails = async (prompt) => {
    try {
      const {data} = await axios.post('http://localhost:8080/ai/chat',{prompt})
      const response = {message:data.message, role:'model'}
      setResponses(prev => [...prev, response])
      console.log('Success: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
    setLoading(false)
  }

  return (
    <div className='chatbox blur-backround large-shadow z-50 bg-[#000518] bg-opacity-70 w-[90vw] md:w-[70vw] lg:w-[40vw] pb-6 h-[85vh] shadow-2xl shadow-purple-600 rounded-md'>
      <div className='h-[13%] pl-3 border-b border-gray-700 flex gap-x-4 items-center'>
        
         <div>
          <h1 className='text-lg font-semibold'>AI chatbot</h1>
          <p className='text-sm text-gray-400'>Real time cripto market data</p>
         </div>
      </div>

      <div className="h-[77%]">
        {responses.length ? <div className='flex flex-col py-5 px-5 overflow-y-auto h-full custom-scrollbar'>
          {responses.map((item, index) => 
          item.role=='user' ? <div key={index} className='self-end'>
            <PromptMessage message={item.message}/>
          </div> : <div key={index} className='self-start'>
            <ResponseMessage message={item.message}/>
          </div>)}
          {loading && <p>fetching data from server...</p>}
        </div> : <div className="p-10 gap-5 h-full flex flex-col        justify-center">
          <p className='text-2xl font-bold'>Welcome to the cripto chatbot</p>
          <p className='text-gray-50'>Inquire about market data.</p>
        </div>}
      </div>

      <div className='h-[10%] px-5'>
        <input type="text"
        onKeyPress={(e) => {
          if(e.key==='Enter') {
            const data = {message:e.target.value, role:'user'}
            setResponses(prev => [...prev, data])
            handleFetchCoinDetails(e.target.value)
          }
        }}
        className='h-full rounded-full border-gray-700 border bg-transparent px-5 w-full outline-none'
        placeholder='give your prompt'
        />
      </div>
    </div>
  )
}

export default Chatbox