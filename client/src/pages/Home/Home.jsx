import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Home.scss";
import { useUsers } from "../../context/UserContext";

function Home() {
  const [counter,setCounter] = useState(0);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { registerNewUser, errors: registerErrors } = useUsers();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await registerNewUser(data);
      if (res.status === 200) {
        alert("Usuario Registrado");
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  return (
    <>
      <header className="header_container">
        <button onClick={() => navigate("/consult")} className="btn">
          Consultar
        </button>
      </header>
      <div className="main_container">
        <form onSubmit={onSubmit} className="form">
        <h1 className="title">Formulario</h1>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Nombre"
            className={errors.name ? "error-input" : "input"}
          />
          {errors.name && (
            <p className="errors">El nombre de usuario es requerido</p>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className={errors.email ? "error-input" :"input"}
            onChange={() => setCounter(counter+1)}
          />
          {errors.email && <p className="errors">El email es requerido</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
            className={errors.password ? "error-input" : "input"}
          />
          {errors.password && (
            <p className="errors">La contraseña es requerida</p>
          )}
          {registerErrors.map((error, i) => (
          <div key={i} className="errors">
            {error}
          </div>
        ))}
          <button type="submit" className="ok_btn">Aceptar</button>
        </form>
      </div>
    </>
  );
}

export default Home;
