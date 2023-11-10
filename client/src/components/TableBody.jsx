import React from "react";
import { useUsers } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function TableBody({ user, _key }) {
    const navigate = useNavigate();
  const { deleteSomeUser } = useUsers();
  return (
    <tr key={_key}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>
        <button
        onClick={()=>{
            navigate(`/edit/${user.id}`);
        }}>Editar</button>
        <button
          onClick={() => {
            deleteSomeUser(user.id);
          }}
        >
          eliminar
        </button>
      </td>
    </tr>
  );
}

export default TableBody;
