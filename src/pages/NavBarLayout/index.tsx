import NavBar from "@components/NavBar";
import { ReactNode } from "react";

function NavBarLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default NavBarLayout;
