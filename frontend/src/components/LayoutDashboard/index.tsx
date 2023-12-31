"use client";
import { ReactNode } from "react";
import {
  ButtonLogout,
  Content,
  ContentTitle,
  Dashboard,
  Divisor,
  ImgLogo,
  Sidebar,
  SidebarLink,
  SidebarTitle
} from "./style";
import {
  PersonFill,
  BuildingFill,
  MortarboardFill,
  Escape,
  PeopleFill,
  HouseDoorFill,
  BookFill,
  PenFill,
  CalendarCheckFill
} from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

interface interfProps {
  children: ReactNode;
  active: string;
}
export const LayoutDashboard = (props: interfProps) => {
  const router = useRouter();

  const logout = function () {
    axios.post("http://localhost:3000/api/logout").then((resposta) => {
      router.push("/login");
    });
  };

  return (
    <>
      <Dashboard>
        <Sidebar>
          <SidebarTitle>
            <ImgLogo src="/img/dashboardlogo.png" />
          </SidebarTitle>
          <Divisor />
          <SidebarLink href="/dashboard" active={props.active === "dashboard"}>
            <HouseDoorFill className="sidebar-icon" />
            Dashboard
          </SidebarLink>
          <SidebarLink href="/alunos" active={props.active === "alunos"}>
            <PeopleFill className="sidebar-icon" />
            Alunos
          </SidebarLink>
          <SidebarLink href="/livros" active={props.active === "livros"}>
            <BookFill className="sidebar-icon" />
            Livros
          </SidebarLink>
          <SidebarLink href="/cursos" active={props.active === "cursos"}>
            <MortarboardFill className="sidebar-icon" />
            Cursos
          </SidebarLink>
          <SidebarLink href="/editoras" active={props.active === "editoras"}>
            <BuildingFill className="sidebar-icon" />
            Editoras
          </SidebarLink>
          <SidebarLink href="/autores" active={props.active === "autores"}>
            <PenFill className="sidebar-icon" />
            Autores
          </SidebarLink>

          <Divisor />

          <ButtonLogout
            onClick={() => {
              logout();
            }}
          >
            <Escape className="sidebar-icon" />
            Sair
          </ButtonLogout>
        </Sidebar>
        <Content>
          <ContentTitle>{props.active[0].toUpperCase() + props.active.substring(1)}</ContentTitle>
          {props.children}
        </Content>
      </Dashboard>
    </>
  );
};
