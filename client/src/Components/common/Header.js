import React from "react";
import { GitHub, LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { projectData } from "../../Config/ProjectData";
import { projectTheme } from "../../Config/ProjectTheme";
import Container from "../../Container/Container";

const Header = () => {
  return (
    <Container className={`py-3 max-w-full ${projectTheme.background} header`}>
      <header className="max-w-7xl mx-auto flex items-center justify-between text-gray-50">
        <Link to="/">
          <h1 className="font-extrabold text-xl">Dashboard</h1>
        </Link>
        <div className="flex flex-end space-x-6">
          <a href={`${projectData.repositoryUrl}`} target="_blank" rel="noreferrer">
            <GitHub />
          </a>
          <LogOut
            onClick={(e) => {
              e.preventDefault();
              try {
                localStorage.removeItem("edexaToken");
                window.location.href = "/auth/login";
              } catch (error) {
                console.log(error?.message);
              }
            }}
            className="cursor-pointer"
          />
        </div>
      </header>
    </Container>
  );
};

export default Header;
