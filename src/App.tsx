import "./App.css";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import StarWarsCharacters from "./pages/star-wars-characters/StarWarsCharacters";
import StarWarsVehicles from "./pages/star-wars-vehicles/StarWarsVehicles";
import StarWarsFilms from "./pages/star-wars-films/StarWarsFilms";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/characters" element={<StarWarsCharacters />} />
          <Route path="/films" element={<StarWarsFilms />} />
          <Route path="/vehicles" element={<StarWarsVehicles />} />
          <Route path="" element={<Navigate to="/characters" replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
