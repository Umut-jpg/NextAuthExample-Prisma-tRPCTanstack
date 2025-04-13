import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="  h-full p-10 rounded-md justify-center flex items-center  ">
      {children}
    </div>
  );
};

export default AuthLayout;
