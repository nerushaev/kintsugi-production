import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useScreenSize from "../../hooks/useScreenSize";
import NavState from "../../context/navState";
import { selectIsLogin } from "../../redux/auth/auth-selectors";
import Logo from "../Home/Logo/Logo";
import { useNavigate } from "react-router-dom";
import HamburgerButton from "../Home/HamburgerButton/HamburgerButton";
import { SideMenu } from "../Home/SideMenu/SideMenu";
import HeaderBusket from "./HeaderBusket";
import HeaderLinks from "./HeaderLinks";
import { Element } from "react-scroll";
import { IoSearch } from "react-icons/io5";
import { LuUserCircle } from "react-icons/lu";
import SearchBar from "./SearchBar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import useModal from "../../hooks/modal";

const AnimationP = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4000;
  background-color: rgba(255, 255, 255, 0.95);
`;

const Navbar = styled.div`
  display: flex;
  position: fixed;
  top: -1px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  outline: currentcolor none medium;
  max-width: 100%;
  margin: 0px;
  align-items: center;
  background: #fff none repeat scroll 0% 0%;
  color: #000;
  min-width: 0px;
  min-height: 0px;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
  z-index: 500;
  height: 60px;
  padding: 0px 8px;

  @media (min-width: 767px) {
    height: 70px;
    padding: 0 30px;
  }
`;

const NavLogoWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderStyle = styled.header`
  margin-bottom: 70px;

  @media (min-width: 767px) {
    margin-bottom: 80px;
  }
`;

const SearchIcon = styled(IoSearch)`
  font-size: 26px;
  margin-right: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: ${theme.colors.formButton}; /* Синий цвет при ховере */
  }
`;

const UserIcon = styled(LuUserCircle)`
  font-size: 26px;
  margin-right: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: ${theme.colors.formButton}; /* Синий цвет при ховере */
  }
`;


const Header = memo(() => {
  const [searchActive, setSearchActive] = useState();
  const isLoggedIn = useSelector(selectIsLogin);
  const screenSize = useScreenSize();
  const navigate = useNavigate();

  const {
    isModalOpen: isSideModalOpen,
    closeModal,
    openModal: openSideModal,
  } = useModal();

  const handleClickUserIcon = () => {
    navigate('/user')
  }

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  }

  useEffect(() => {
    if(isSideModalOpen) {
      setSearchActive(false)
    }
  }, [isSideModalOpen, setSearchActive])

  return (
    <>
    <NavState>
      <Element name="scroll" />
      <HeaderStyle id="header">
        <Navbar>
          <Logo />

          <NavLogoWrapper>
            {screenSize.width > 767 && <HeaderLinks />}

            
            <SearchIcon onClick={handleSearchClick} />
            <HeaderBusket closeModal={closeModal} isSideModalOpen={isSideModalOpen} openSideModal={openSideModal}  />
            {isLoggedIn && (
              <UserIcon onClick={handleClickUserIcon} />
            )}
            {screenSize.width < 767 && <HamburgerButton />}
          </NavLogoWrapper>
        </Navbar>

        <SideMenu />
      </HeaderStyle>
    </NavState>

    <AnimatePresence mode="sync">
        {searchActive && (
          <AnimationP
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <SearchBar setSearchActive={setSearchActive} />
          </AnimationP>
        )}
      </AnimatePresence>
    </>
  );
});

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default Header;

