
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      {/* <Navbar /> */}
      <div className="min-h-screen">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
