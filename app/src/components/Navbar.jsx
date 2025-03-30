import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/authSlice';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 5%;
  position: fixed;
  width: 100vw;
  top: 0;
  background: ${({ themeMode, theme }) => theme[themeMode].glass};
  backdrop-filter: blur(12px);
  z-index: 1000;
  border-bottom: 1px solid ${({ themeMode, theme }) => 
    themeMode === 'dark' ? 'rgba(124, 177, 255, 0.1)' : 'rgba(0, 124, 255, 0.1)'};
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
  cursor: pointer;
  letter-spacing: -0.5px;
`;

const ThemeToggle = styled.button`
  background: transparent;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1.5px solid ${({ themeMode, theme }) => theme[themeMode].primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ themeMode, theme }) => theme[themeMode].primary}15;
  }
`;

const AuthButton = styled.button`
  padding: 0.8rem 0.8rem;
  border-radius: 12px;
  border: 1.5px solid ${({ themeMode, theme }) => theme[themeMode].primary};
  background: ${({ filled, themeMode, theme }) => 
    filled ? theme[themeMode].primary : 'transparent'};
  color: ${({ filled, themeMode, theme }) => 
    filled ? (themeMode === 'dark' ? '#0a192f' : '#ffffff') : theme[themeMode].primary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  gap: 8px;
  align-items: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ themeMode, theme }) => 
      theme[themeMode].primary}20;
  }

  &::after {
    content: "LogOut";
    position: absolute;
    top: 60px; 
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const UserCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ theme, themeMode }) => theme[themeMode].primary};
  color: ${({ theme, themeMode }) => themeMode === 'dark' ? theme[themeMode].background : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
`;

const UserName = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${({ themeMode, theme }) => theme[themeMode].primary};
`

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ConfirmationDialog = styled.div`
  background: ${({ themeMode, theme }) => theme[themeMode].background};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${({ themeMode, theme }) => theme[themeMode].primary}20;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
`;

const DialogMessage = styled.p`
  color: ${({ themeMode, theme }) => theme[themeMode].text};
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const DialogButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const DialogButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1.5px solid ${({ themeMode, theme, variant }) => 
    variant === 'confirm' ? theme[themeMode].primary : theme[themeMode].border};
  background: ${({ themeMode, theme, variant }) => 
    variant === 'confirm' ? theme[themeMode].primary : 'transparent'};
  color: ${({ themeMode, theme, variant }) => 
    variant === 'confirm' ? (themeMode === 'dark' ? theme[themeMode].background : '#fff') : theme[themeMode].text};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ themeMode, theme, variant }) => 
      variant === 'confirm' ? theme[themeMode].primaryHover : theme[themeMode].hover};
  }
`;

export default function Navbar({ themeMode, isLoggedIn, setIsLoggedIn, setIsDarkMode, theme }) {

  const dispatch = useDispatch();

  const handdleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
  }

  const user = useSelector(state => state.auth);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
  };

  return (
    <>
    <Nav themeMode={themeMode} theme={theme}>
      <ThemeToggle 
        onClick={() => setIsDarkMode(prev => !prev)}
        themeMode={themeMode}
        theme={theme}
      >
        {themeMode === 'dark' ? '🌙' : '☀️'}
      </ThemeToggle>
      <Logo themeMode={themeMode} theme={theme}>CodeTrace</Logo>
      <div>
        {isLoggedIn ? (
          <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
            <UserName themeMode={themeMode} theme={theme}>Hii! {user.currentUser.username}</UserName>
            <UserCircle theme={theme} themeMode={themeMode}>
            {user.currentUser.username[0]}
            </UserCircle>

            <AuthButton 
              theme={theme} 
              themeMode={themeMode}
              onClick={() => setShowLogoutConfirm(true)}
            >
              <FaSignOutAlt />
            </AuthButton>
          </div>
        ) : (
          <>
            <Link to='/login'> <AuthButton 
              themeMode={themeMode}
              theme={theme}
              onClick={() => setIsLoggedIn(true)}
            >
              Sign In
            </AuthButton>
            </Link>
            <Link to='/register'> <AuthButton 
              filled 
              themeMode={themeMode}
              theme={theme}
              style={{ marginLeft: '1rem' }}
            >
              Get Started
            </AuthButton>
            </Link>
          </>
        )}
      </div>
    </Nav>
    {showLogoutConfirm && (
        <ConfirmationOverlay>
          <ConfirmationDialog themeMode={themeMode} theme={theme}>
            <DialogMessage themeMode={themeMode} theme={theme}>
              Are you sure you want to logout?
            </DialogMessage>
            <DialogButtons>
              <DialogButton 
                themeMode={themeMode}
                theme={theme}
                variant="confirm"
                onClick={handleLogout}
              >
                Yes
              </DialogButton>
              <DialogButton 
                themeMode={themeMode}
                theme={theme}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </DialogButton>
            </DialogButtons>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}
    </>
  );
}