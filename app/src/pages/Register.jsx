import React, { useState } from 'react';
import AuthImage from '../images/auth_image.jpg';
import { useDispatch, useSelector } from 'react-redux';
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
import { register } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.auth);

  const isValidEmail = (email) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendVerificationCode = () => {
    if (isValidEmail(email)) {
      console.log('Invalid email address');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setIsVerificationSent(true);
    setIsEmailVerified(false);
    alert(`Please note down the verification code for ${email}: ${code}`)
  };

  const verifyCode = () => {
    if (verificationCodeInput === generatedCode) {
      setIsEmailVerified(true);
      console.log('Email verified successfully');
    } else {
      console.log('Incorrect verification code');
    }
  };

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      console.log('Please verify your email address');
      return;
    }

    if (!fullName || !email || !password || !confirmPassword) {
      console.log('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }

    register(dispatch, { username: fullName, email: email, password: password });

    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsVerificationSent(false);
    setGeneratedCode('');
    setVerificationCodeInput('');
    setIsEmailVerified(false);

    navigate('/');
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <AuthLeft bgImage={AuthImage} />
        <AuthRight>
          <AuthTitle>
            Create <span>Account</span>
          </AuthTitle>
          <AuthForm>
            <AuthInput
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <AuthInput
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsVerificationSent(false);
                setIsEmailVerified(false);
              }}
            />

            {!isVerificationSent && (
              <AuthButton type="button" onClick={sendVerificationCode}>
                Verify your email
              </AuthButton>
            )}

            {isVerificationSent && !isEmailVerified && (
              <>
                <AuthInput
                  type="text"
                  placeholder="Enter Verification Code"
                  value={verificationCodeInput}
                  onChange={(e) => setVerificationCodeInput(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <AuthButton type="button" onClick={verifyCode}>
                    Verify Code
                  </AuthButton>
                  <AuthButton type="button" onClick={sendVerificationCode}>
                    Resend Code
                  </AuthButton>
                </div>
              </>
            )}

            {isEmailVerified && (
              <p style={{ color: 'green', fontSize: '14px' }}>Email verified!</p>
            )}

            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AuthInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <AuthButton onClick={handleRegister} disabled={isFetching}>
              Sign Up
            </AuthButton>
          </AuthForm>
          <AuthText>
            Already have an account? <a href="/login">Sign In</a>
          </AuthText>
          {error && <p style={{ color: 'red' }}>Registration failed!</p>}
        </AuthRight>
      </AuthWrapper>
    </AuthContainer>
  );
};

export default Register;
