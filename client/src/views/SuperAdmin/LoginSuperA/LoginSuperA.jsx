import React from "react";
import { useState } from "react";
import validation from "./validation";
import style from "./LoginSuperA.module.css";


function LoginSuperA({ login }) {


  const [userData, setUserData] = useState({

    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setErrors(validation({
      ...userData,
      [event.target.name]: event.target.value
    }))

    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(userData)
  }


  return (




    <div className={style.container}>

      <div className={style.formContainer}>
        <h2 className={style.h2}>Bienvenido al Sitio Super Administrador</h2>



        <form >

          <label className={style.label}>Email </label>
          <input
            onChange={handleChange}
            value={userData.email}
            type="text"
            name='email'
            className={style.input}
          />

          {errors.e1 ? (<p>{errors.e1}</p>)
            : errors.e2 ? (<p>{errors.e2}</p>)
              : (<p className={style.error}>{errors.e3}</p>)}

          <br />

          <label className={style.label}>Password </label>
          <input
            onChange={handleChange}
            value={userData.password}
            type="password"
            name="password"
            className={style.input}
          />

          {errors.p1 ? (<p>{errors.p1}</p>)
            : (<p className={style.error}>{errors.p2}</p>)}

          <br />

          <button type="submit" onClick={handleSubmit} className={style.button}>Submit</button>

        </form>
      </div>

    </div>
  )
}

export default LoginSuperA;
