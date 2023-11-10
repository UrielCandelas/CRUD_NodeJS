import React, { useEffect } from "react";
import { Navigate,useParams,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Edit.scss";
import { useUsers } from "../../context/UserContext";

function Edit() {

  const {id} = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }}
   = useForm();

  const { editSomeUser, errors: editErrors,getSomeUser } = useUsers();

  const onSubmit = handleSubmit(async(data) => {
    try {
      const res = await editSomeUser(data,id);
      if (res.status === 200) {
        navigate("/consult");
      }
    } catch (error) {
      console.log(error.message)
    }
  });
  useEffect(() => {
    async function loadUser (){
      if (id) {
        const user = await getSomeUser(id);
        setValue("name", user.name);
        setValue("email", user.email);
      }
    }
    loadUser()
  },[])

  return (
    <>
      <h1>Editar</h1>
      <button onClick={()=>navigate("/consult")}>Consultar</button>
      {editErrors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("name")}
          placeholder="Nombre"
          autoFocus
        />
        {errors.name && <p>El nombre de usuario es requerido</p>}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <p>El email es requerido</p>}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
        />
        {errors.password && <p>La contraseña es requerida</p>}
        <button type="submit">Aceptar</button>
      </form>
    </>
  );
}

export default Edit;
