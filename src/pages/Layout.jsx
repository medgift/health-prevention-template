import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import styled from "styled-components"
import Home from "./Home";

export default function Layout() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
`;