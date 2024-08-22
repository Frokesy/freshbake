import { FC } from "react";

interface AuthProps {
  activePage: string;
}

const Auth: FC<AuthProps> = ({ activePage }) => {
  return (
    <div>
      <h2>Auth: {activePage}</h2>
    </div>
  );
};

export default Auth;
