import React, { useEffect, useState } from "react";
import { FriendsList } from "./FriendsList";
import { FormAddFriend } from "./FormAddFriend";
import { FormSplitBill } from "./FormSplitBill";
import { Button } from "./Button";
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
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
