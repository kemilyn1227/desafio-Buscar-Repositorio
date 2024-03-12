import { useState } from 'react';
import gitLogo from '../assets/github.png' 
import ItemRepo from '../components/ItemRepo';
import Input from '../components/input';
import Button from '../components/button';

import { Container } from './styles'
import { api } from '../services/Api'

function App() {

  const [repos,setRepos] = useState([])
  const [currentRepo, setCurrentRepo] = useState('')
  
  const handleSearchRepo = async ()=> {

    const { data } = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){

        setRepos( prev => [...prev, data])
        setCurrentRepo('')
        return

      }
      
    }

    alert('Repositório Não encontrado ou ja existente')
  }

  const handleRemoveRepo = (id) =>{
     
    const removido = repos.filter((repos)=>(repos.id !== id))

    setRepos(removido)
    
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='logo github'/>

      <Input value={currentRepo} onChange={(e)=> setCurrentRepo(e.target.value)}/>

      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo}/>)}
     
    </Container>
  );
}

export default App;
