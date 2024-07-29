import React, { useState, useEffect } from "react";
import { ReactComponent as Vector } from "../assets/Vector.svg";
import { ReactComponent as Vector_select } from "../assets/Vector_select.svg";
import "./UserPosts.css";


interface Post {
  id: number;
  title: string;
  body: string;
}

interface UserPostsProps {
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  favorites: number[];
  userName: string;
  userId: number;
}

const UserBlock: React.FC<UserPostsProps> = ({
  setFavorites,
  favorites,
  userName,
  userId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            const data = await response.json();
            setPosts(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
    fetchPosts();
}, [userId]);

  const toggleFavorite = () => {
    setFavorites((prev) => 
    prev.includes(userId)
    ? prev.filter(id => id !== userId)
    : [...prev, userId]
  )
  };

  if (loading) {
    return(
      <div className="box-spinner">
        <div className="spinner"></div>        
      </div>
      
    )
  }

  return (
    <div>
      <div className="user-header">
        <div className="header-block">
          <h1>{userName}</h1>
          <button className="button-favorites" onClick={toggleFavorite}>
            {favorites.includes(userId) 
            ? (
              <Vector_select />
              ) 
            : 
            (
              <Vector />
            )}
          </button>
        </div>
        <h2>Posts</h2>
      </div>
      <div className="user-card">
        {posts.map((post) => (
          <div className="post-block">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserBlock;
