import React from "react";
import { Button } from "./Button";

export function Friend({ friend, onSelectFriend, selectedFriend }) {
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
