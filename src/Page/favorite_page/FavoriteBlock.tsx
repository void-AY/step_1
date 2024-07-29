import React from "react";
import "./FavoriteBlock.css";
import UserCard from "../main_page/UserCard";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface FavoritePostsProps {
  users: User[];
  favorites: number[];
  handleUserClick: (user: User) => void;
}


const FavoritePosts: React.FC<FavoritePostsProps> = ({ users, favorites, handleUserClick }) => {
  const favoritePosts = users.filter(user => favorites.includes(user.id));
  const navigate = useNavigate();

  const handleClick = (user: User) => {
    handleUserClick(user)
    navigate(`/posts/${user.id}`);
}

  if (favoritePosts.length === 0) 
    return (
  <div className="block-null">
    <h1>Вы пока никого не добавили в избранное 😭</h1>
  </div>
  );

  return (
    <div className="main-block">
      {favoritePosts.map(user => (
        <UserCard key={user.id} user={user} onClick={handleClick}/>
      ))}
    </div>
  );
};
export default FavoritePosts;
