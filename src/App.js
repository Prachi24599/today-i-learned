import "./style.css";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import FactList from "./components/FactList";
import NewFactForm from "./components/NewFactForm";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import Spinner from "./components/Spinner";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");
      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }

      const { data: facts, error } = await query
        .order("votesInteresting", {
          ascending: false,
        })
        .limit(1000);

      // console.log(facts);
      if (!error) setFacts(facts);
      else alert("There is problem getting data");
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm && (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      )}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Spinner />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

export default App;
