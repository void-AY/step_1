import React from "react";
import "./CardBlock.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className="card-user" key={user.id} onClick={() => onClick(user)}>
      <h1>{user.name}</h1>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
    </div>
  );
};
export default UserCard;
