import styled from "styled-components";
import Link from "next/link";

interface linkProps {
  active: boolean;
}

export const Dashboard = styled.div`
  display: flex;
  width: 100%;
  height: 1000px;
  background-color: #1b1e4f;
  color: #fff;
`;

export const Divisor = styled.hr``;
export const SpaceDiv = styled.div``;
export const Space = styled.br``;

export const ImgLogo = styled.img`
  width: 100%;
`;

export const Sidebar = styled.div`
  flex: 0 0 200px;
  padding: 20px;
  width: 100%;

  background-color: #0d0e26;
`;

export const SidebarTitle = styled.h6`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 14px;
  text-transform: uppercase;
  color: #eeee;
`;

export const SidebarLink = styled(Link)<linkProps>`
  display: block;
  padding: 8px 1.5rem;
  color: #FFFFFF;
  text-decoration: none;
  background-color: ${(props: any) => props.active ? 'rgba(13, 110, 253, 0.1)' : 'var(--red)'};
  font-size: 14px;
  margin-left: -20px;

  &:hover {
    color: #0d6efd;
    background-color: rgba(13, 110, 253, 0.1);
  }

  .sidebar-icon {
    margin-right: 0.5rem;
  }
`;

export const User = styled.div`
  font-size: 30px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const ContentTitle = styled.h1`
  margin-top: 0;
  color: #fff;
`;

export const ContentText = styled.p`
  color: #fff;
`;

export const ButtonLogout = styled.button`
  display: block;
  padding: 8px 1.5rem;
  color: #f33333;
  text-decoration: none;
  margin-left: -20px;
  background-color: #00abef00;
  border: none;
  &:hover {
    color: #f33333;
    background-color: #f333331f;
  }

  .sidebar-icon {
    margin-right: 0.5rem;
  }
`;
