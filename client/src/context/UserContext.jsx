import { useState, useContext, createContext, useEffect } from "react";

import {
  register,
  getOne,
  getAllUsers,
  edit,
  deleteUser,
} from "../api/users.js";

export const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);

  const registerNewUser = async (user) => {
    try {
      const res = await register(user);
      return res
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const editSomeUser = async (user, id) => {
    try {
      const res = await edit(user, id);
      if (res.status === 200) {
        setUsers(users.map((user) => (user.id === id ? res.data : user)));
        return res
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const getSomeUser = async (id) => {
    try {
      const res = await getOne(id);
      return res.data
    } catch (error) {
      console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteSomeUser = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timmer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timmer);
    }
  }, [errors]);

  const getUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.log("mal");
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  return (
    <UserContext.Provider
      value={{
        registerNewUser,
        editSomeUser,
        getSomeUser,
        deleteSomeUser,
        getUsers,
        errors,
        users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
