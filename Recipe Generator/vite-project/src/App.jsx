import { ThemeProvider } from "./contexts/ThemeContext";
import RecipeGenerator from "./components/RecipeGenerator";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <RecipeGenerator />
      </div>
    </ThemeProvider>
  );
}

export default App;
