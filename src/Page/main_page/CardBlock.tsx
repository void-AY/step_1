import React, { useState, useEffect } from "react";
import "./CardBlock.css";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface CardListProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleUserClick: (user: User) => void;
}

const CardBlock: React.FC<CardListProps> = ({
  setUsers,
  handleUserClick,
}) => {
  const [users, setLocalUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 12;
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const data = await response.json();
            // setLocalUsers(prev => [...prev, ...data]); // Добавляем новые данные к предыдущим (для теста пагинации, но может работать криво из за того что одни и те же пользователи)
            setUsers(data);
            setLocalUsers(data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
    fetchUsers();
}, [setUsers]);

  const handleClick = (user: User) => {
    handleUserClick(user);
    navigate(`/posts/${user.id}`);
  };

  if (loading) {
    return(
      <div className="box-spinner">
        <div className="spinner"></div>        
      </div>
      
    )
  }

  //Пагинация
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <div className="main-block">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} onClick={handleClick} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-arrow"
        >
          <p>&lt;--</p>
        </button>
        <span className="pagination-info">
          {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-arrow"
        >
          <p>--&gt;</p>
        </button>
      </div>
    </div>
  );
};
export default CardBlock;
