import React, { useState } from "react";
import supabase from "../supabase";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];
const Fact = ({ fact, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleVote() {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ votesInteresting: fact.votesInteresting + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    // console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (category) => category.name === fact.category
          ).color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={handleVote} disabled={isUpdating}>
          👍 {fact.votesInteresting}
        </button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
};

export default Fact;
