import React, { useState } from "react";
import { Button } from "./Button";

export function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}? = ${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧩Friend Name</label>
      <input type="text" value={name} onChange={handleNameChange} />

      <label>🌄Image URL</label>
      <input type="text" value={image} onChange={handleImageChange} />

      <Button>Add</Button>
    </form>
  );
}
