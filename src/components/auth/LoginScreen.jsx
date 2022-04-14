import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import './login.css';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    })
    const {lEmail, lPassword} = formLoginValues

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: ''
    })
    const {rName, rEmail, rPassword1, rPassword2} = formRegisterValues


    const dispatch = useDispatch();

    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e)=>{
        e.preventDefault();

        if (isFormValid()) {
            
            dispatch(startRegister(rName, rEmail, rPassword1))
        }

    }

    const isFormValid = ()=>{

        if(rName.trim().length===0){
            Swal.fire('Error', 'el nombre no debe estar vacio','error');
            return false;
        }else if ( !validator.isEmail(rEmail) ){
            Swal.fire('Error','Agrega un Email Valido','error');
            return false;
        }else if (rPassword1 !== rPassword2 || rPassword1.length < 5){
            Swal.fire('Error', 'Las contraseñas no son iguales','error');
            return false;
        }

        return true;
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                onChange={handleLoginInputChange}
                                
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                onChange={handleLoginInputChange}
                                
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                onChange={handleRegisterInputChange}
                                
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                onChange={handleRegisterInputChange}
                                
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                onChange={handleRegisterInputChange}
                                
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                onChange={handleRegisterInputChange}
                                
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
