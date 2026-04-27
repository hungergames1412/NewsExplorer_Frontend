import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

function Header({ onSearch, handleLogout, handleSigninClick, isLoggedIn}) {
  return (
    <div className="header">
      <Navigation
        handleLogout={handleLogout}
        handleSigninClick={handleSigninClick}
        isLoggedIn={isLoggedIn}
      />
      <SearchForm onSearch={onSearch} />
    </div>
  );
}

export default Header;