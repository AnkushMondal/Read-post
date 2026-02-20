import React from "react";
import { Link } from "react-router-dom";
import { LogoutButton, Container, Logo } from "../../";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  //it use to get user status from the store and then we can use it to show the logout button or not
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  //it use to navigate to the home page after logout
  const navItems = [
    {
      name: "Home",
      URL: "/",
      active: true,
    },
    {
      name: "Login",
      URL: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      URL: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      URL: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      URL: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.URL)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
