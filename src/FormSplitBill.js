import React, { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paiedByUser, setPaiedByUser] = useState("");
  const payedByFriend = bill ? bill - paiedByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paiedByUser) return;
    onSplitBill(whoIsPaying === "user" ? payedByFriend : -paiedByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>

      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🍕Your expense</label>
      <input
        type="text"
        value={paiedByUser}
        onChange={(e) =>
          setPaiedByUser(
            Number(e.target.value) > bill ? paiedByUser : e.target.value
          )
        }
      />

      <label>😻{selectedFriend.name} expense</label>
      <input type="text" disabled value={payedByFriend} />

      <label>🤔Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  );
}
