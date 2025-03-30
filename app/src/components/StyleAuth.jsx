import styled from 'styled-components';

export const AuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background: #7cb1ff;
`;

export const AuthWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const AuthLeft = styled.div`
  flex: 1;
  height: 100%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bgImage || 'none'});
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthRight = styled.div`
  flex: 1;
  padding: 0 60px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const AuthTitle = styled.h1`
  font-size: 2.5rem;
  color:rgb(255, 255, 255);
  margin-bottom: 40px;
  font-weight: 700;
  text-align : center;
  span {
    color: #007cff;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 400px;
  margin: 0 auto;
`;

export const AuthInput = styled.input`
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007cff;
    outline: none;
  }
`;

export const AuthButton = styled.button`
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  background: #007cff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background:rgb(0, 66, 137);
    transform: translateY(-2px);
  }
`;

export const AuthText = styled.p`
  color:white;
  text-align: center;
  margin-top: 20px;

  a {
    color: #007cff;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;