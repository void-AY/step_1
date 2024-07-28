import React, {useState, useEffect} from "react";
import './CardBlock.css'
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

const CardBlock = () => {
    const [users, setUsers] = useState<User[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div className="mainBlock">
            {users.map(user => (
                <div className="CardUser" key={user.id}>{/* onClick={() => navigate(`/posts/${user.id}`)} */}     
                    <h1>{user.name}</h1>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{user.website}</p>
                </div>
            ))}
        </div>
    )
}

export default CardBlock;