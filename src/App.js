import React, { useEffect, useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [friends, setFriends] = useState(() => {
    const localFriendsList = localStorage.getItem("friends");
    return localFriendsList ? JSON.parse(localFriendsList) : initialFriends;
  });
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriendClick() {
    setShowAddFriendForm((current) => !current);
    setSelectedFriend(null);
  }
  function handleAddFriend(newFriend) {
    setFriends((current) => [...current, newFriend]);
    setShowAddFriendForm(false);
  }
  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
    setShowAddFriendForm(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          list={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddFriendClick}>
          {showAddFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function FriendsList({ list, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {list.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend && selectedFriend.id === friend.id;
  function handleSelect(friend) {
    isSelected ? onSelectFriend(null) : onSelectFriend(friend);
  }
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} EGP
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes You {Math.abs(friend.balance)} EGP
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are settled up</p>}
      <Button onClick={() => handleSelect(friend)}>
        {isSelected ? "Close" : "Split bill"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
