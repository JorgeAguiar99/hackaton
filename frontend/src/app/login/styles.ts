import React from "react";
import styled from "styled-components";

export const CardLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100vw;
  height: 100vh;
  background-color: black;
  font-family: sans-serif;
  color: #adb5bd;
`;

export const CardSenhaEmail = styled.div`
  width: 50%;
`;

export const InputLogin = styled.input`
  background-color: #212529;
  border-color: black;
  border-radius: 100px;
  margin: 5px;
  display: block;
  color: gray;

  &::placeholder {
    color: gray;
  }

  &:focus {
    background-color: #212529;
    color: gray;
  }
`;

export const CardTitle = styled.h1`
  color: #00adef;
  font-size: 20px;
`;

export const CardButton = styled.div`
  text-align: center;
  padding: 3%;
`;

export const ButtonConfig = styled.button`
  width: 52%;
  border-radius: 100px;
`;

export const CardImage = styled.div`
  text-align: center;
  padding: 10px;
`;

export const SizeImage = styled.img`
  width: 85%;
`;

export const ImgTriodev = styled.img`
  width: 50px;
`;

export const CardCopyright = styled.div`
  color: #adb5bd;
  font-size: 16px;
  padding-top: 50px;
`;

export const CardRememberMe = styled.div`
  color: #adb5bd;
  width: 53%;
`;

export const CardForm = styled.form`
  justify-content: center;
  padding: 10px;
`;

export const InputSelect = styled.select`
  background-color: #212529;
  border-color: black;
  border-radius: 100px;
  margin: 5px;
  display: block;
  color: gray;
  width: 100%;
  padding: 10px;

  &::placeholder {
    color: gray;
  }

  &:focus {
    background-color: #212529;
    color: gray;
  }
`;

export const AppContainer = styled.div`
  font-size: 0.875rem;
  background-color: #212529;
  margin: 0;
`;

export const FeatherIcon = styled.span`
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 767.98px) {
    top: 5rem;
  }
`;

export const SidebarSticky = styled.div`
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const SidebarLink = styled.a`
  font-weight: 500;
  color: #333;
  display: block;

  .feather {
    margin-right: 4px;

`;