import React from "react";
import { Friend } from "./Friend";

export function FriendsList({ list, onSelectFriend, selectedFriend }) {
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
