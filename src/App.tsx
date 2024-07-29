import React, { useState } from "react";
import { ReactComponent as Vector } from "./Page/assets/Vector.svg";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserBlock from "./Page/user_page/UserPosts";
import CardBlock from "./Page/main_page/CardBlock";
import FavoritePosts from "./Page/favorite_page/FavoriteBlock";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);

  const handleUserClick = (user: User) => {
    setUserName(user.name);
    setUserId(user.id)
}

  return (
  <BrowserRouter>    
    <div>
      <div className="App-header">
        <nav>
          <Link className="App-link" to="/favorites" >
            <h3>Избранное</h3>
            <Vector/>          
          </Link>          
        </nav>

      </div>      
      <div className="App">
          <Routes>
            <Route path="/" element={<CardBlock setUsers={setUsers} handleUserClick={handleUserClick}/>} />
            <Route
              path="/posts/:userId"
              element={
                <UserBlock
                  setFavorites={setFavorites}
                  favorites={favorites}
                  userName={userName}
                  userId={userId}
                />
              }
            />
            <Route path="/favorites" element={<FavoritePosts users={users} favorites={favorites} handleUserClick={handleUserClick} />}/>
          </Routes>
        
      </div>      
    </div>
  </BrowserRouter>
  );
};

export default App;
