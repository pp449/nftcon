import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import OpenNavbar from './OpenNavbar';
import { menus } from './data';
import {
	ConnectButton,
	Container,
	EmptyBox,
	Logo,
	LogoH1,
	LogoImg,
	LogoImgBox,
	Menu,
	MenuItem,
	MenuLink,
	Nav,
	OpenMenu,
} from './styled';
import useMetamask from '../../hooks/useMetamask';
import Metamask from '../../utils/metamask';

const LOGO_IMG = '/assets/images/luniverse_symbol.png';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [accounts, setAccounts, buttonText, isConnected] = useMetamask();

	const handleOnClickConnect = () => {
		if (Metamask.isInstalled()) {
			Metamask.switchToDemoChain().then(() => Metamask.connect().then(setAccounts));
		} else {
			window.open('https://metamask.io/download/');
		}
	};

	const handleOnClickOpenMenu: VoidFunction = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const changeNav = () => {
		if (window.innerWidth >= 900) {
			setIsMenuOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', changeNav);
		return () => {
			window.removeEventListener('resize', changeNav);
		};
	}, []);

	return (
		<>
			<OpenNavbar isOpen={isMenuOpen} toggle={handleOnClickOpenMenu} menus={menus} />
			<Container>
				<Nav>
					{/* Logo */}
					<Logo to="/">
						<LogoH1>NFTICon</LogoH1>
					</Logo>

					{/* Button to open menu */}
					<OpenMenu>
						<FaBars onClick={handleOnClickOpenMenu} />
					</OpenMenu>

					{/* Navbar menu */}
					<Menu>
						<MenuItem>
							<MenuLink to={`/mint`}>판매하기</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to="/mypage">마이페이지</MenuLink>
						</MenuItem>
						<MenuItem>
							<ConnectButton onClick={handleOnClickConnect} disabled={isConnected}>
								{buttonText}
							</ConnectButton>
						</MenuItem>
					</Menu>
				</Nav>
			</Container>
			{/* <EmptyBox /> */}
		</>
	);
};

export default Navbar;
