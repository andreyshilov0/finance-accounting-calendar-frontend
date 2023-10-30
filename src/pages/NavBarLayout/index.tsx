import NavBar from "@components/NavBar";
import { ReactNode } from "react";

const NavBarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default NavBarLayout;
