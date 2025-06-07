import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CreateNewMatch from './CreateNewMatch'
import HeaderComponent from './HeaderComponent'

import ViewAllTeams from './ViewAllTeams'

const queryClient = new QueryClient();

function App() {

  return (

    <>
   
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       
    <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/profile" element = {<Profile/>}/>
      <Route path="/match/create" element = {<CreateNewMatch/>}/>

      <Route path="/teams" element = {<ViewAllTeams/>}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
