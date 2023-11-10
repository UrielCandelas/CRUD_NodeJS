import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UserContext";
import TableBody from "../../components/TableBody";

function Consult() {
  const navigate = useNavigate();
  const { getUsers, users} = useUsers();
  useEffect(() => {
    getUsers();
  }, []);
  if (users.length === 0) {
    return (
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Regresar
        </button>
        <h1>No hay Usuarios Registrados</h1>
      </div>
    );
  } else {
    return (
      <>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Regresar
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((element, i) => (
              <TableBody user={element} _key={i} key={i}/>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Consult;
