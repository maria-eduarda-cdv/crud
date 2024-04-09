import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [livros, setLivros] = useState([]);
const [novoLivro, setNovoLivro] = useState({
  isbn: '',
  titulo: '',
  editora: '',
  genero: '',
  autor: '',
});
useEffect(() => {
  fetchVeiculos();
}, []);
const fetchVeiculos = async () => {
  try {
    const response = await axios.get('http://localhost:8090/livros');
    setLivros(response.data);
  } catch (error) {
    console.error('Erro ao buscar Livros:', error);
  }
};
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNovoLivro((prevVeiculo) => ({
    ...prevVeiculo,
    [name]: value,
  }));
};
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:8090/livros', novoLivro);
    fetchVeiculos();
    setNovoLivro({
      isbn: '',
      titulo: '',
      editora: '',
      genero: '',
      autor: '',
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  }
};
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8090/livros/${id}`);
    fetchVeiculos();
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
  }
};
const handleUpdate = async (id, livroAtualizado) => {
  try {
    await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
    fetchVeiculos();
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
  }
};
return (
  <div>
    
    <h1>Gerenciamento de Livros</h1>

    
    <form onSubmit={handleSubmit}>
      
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={novoLivro.isbn}
        onChange={handleInputChange}
      />
      
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={novoLivro.titulo}
        onChange={handleInputChange}
      />
      
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={novoLivro.autor}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="editora"
        placeholder="Editora"
        value={novoLivro.editora}
        onChange={handleInputChange}
      />
      
      <input
        type="text"
        name="genero"
        placeholder="Gênero"
        value={novoLivro.genero}
        onChange={handleInputChange}
      />
      
      <button type="submit">Adicionar livro</button>
    </form>

    
    <ul>
      
      {livros.map((livro) => (
        <li key={livro.id}>
          
          {livro.isbn} - {livro.titulo} {livro.autor} {livro.editora} {livro.genero}
          
          
          <button onClick={() => handleDelete(livro.id)}>Excluir</button>
          
          
          <button
            onClick={() =>
              handleUpdate(livro.id, {
                ...livros,
                isbn: novoLivro.isbn,
                titulo: novoLivro.titulo,
                genero: novoLivro.genero,
                autor: novoLivro.autor,
                editora: novoLivro.editora,
              })
            }
          >
            Atualizar
          </button>
        </li>
      ))}
    </ul>
  </div>
);

}
export default App;