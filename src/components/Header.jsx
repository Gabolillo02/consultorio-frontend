import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Avatar
} from "@nextui-org/react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { DentalLifeLogo } from "./icons/DentalLifeLogo.jsx";
import FormRegistroUser from "./forms/FormRegistroUser.jsx";
import FormIniciarSesion from "./forms/FormIniciarSesion.jsx"
import Inicio from "./Inicio.jsx"
import Especialistas from "../Especialistas/Especialistas.jsx";
import { useAuth } from '../AuthContext.jsx';
import AgendarCita from "../AgendarCita.jsx"
import Dashboard from "./Dashboard.jsx"
import AcercaDe from "./AcercaDe";

export default function NavBar() {
  const { isAuthenticated, userEmail, logout } = useAuth();

  return (
    <BrowserRouter>
      <Navbar>
        <NavbarBrand>
          <DentalLifeLogo />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/especialistas" className="text-black">
              Especialistas
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/acerca">
              Acerca de
            </Link>
          </NavbarItem>
        </NavbarContent>

        {isAuthenticated ? (<NavbarContent justify="end">
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-center">
            <DropdownTrigger>
              <Avatar
                showFallback
                as="button"
                className="transition-transform"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Bienvenid@</p>
                <p className="font-semibold">{userEmail}</p>
              </DropdownItem>
              <DropdownItem key="config">
                Configuracion
              </DropdownItem>
              <DropdownItem key="citas">
                Mis citas
              </DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger" onPress={logout}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div></NavbarContent>) : (<NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <FormIniciarSesion />
          </NavbarItem>
          <NavbarItem>
            <FormRegistroUser />
          </NavbarItem>
        </NavbarContent>)}
      </Navbar>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/especialistas" element={<Especialistas />} />
        <Route path="/acerca" element={<AcercaDe />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}