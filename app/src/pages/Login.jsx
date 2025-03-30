import React, { useState } from 'react';
import AuthImage from '../images/auth_image.jpg';
import {
  AuthContainer,
  AuthWrapper,
  AuthLeft,
  AuthRight,
  AuthTitle,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthText
} from '../components/StyleAuth';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { error, currentUser} = useSelector(state=>state.auth);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(currentUser === null){
      if(!username || !password){
          console.log("Please enter everything!");
      }
      else{
        console.log(username);
          login(dispatch, { username : username, password: password });
          setUsername("");
          setPassword("");
          navigate('/');
      }
    }
    if(error){
        console.log("Error while login!");
    }
  }

  return (
    <AuthContainer>
      <AuthWrapper>
        <AuthLeft bgImage={AuthImage} />
        <AuthRight>
          <AuthTitle>Welcome <span>Back</span></AuthTitle>
          <AuthForm>
            <AuthInput value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
            <AuthInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <AuthButton onClick={(e) => handleLogin(e)}>Sign In</AuthButton>
          </AuthForm>
          <AuthText>
            Don't have an account? <a href="/register">Create Account</a>
          </AuthText>
        </AuthRight>
      </AuthWrapper>
    </AuthContainer>
  );
};

export default Login;