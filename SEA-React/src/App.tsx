import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/profile" element = {<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
