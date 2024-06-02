import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Pokedex />} />
        <Route
          exact
          path="/:pokemonId"
          element={ <Pokemon />}
        />
      </Routes>
    </Router>
  );
}

export default App;
