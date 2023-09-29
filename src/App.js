import "./style.css";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";

function App() {
  return (
    <>
      <Header />
      <NewFactForm />
      <main className="main">
        <FactList />
        <CategoryFilter />
      </main>
    </>
  );
}

export default App;
