import React, { useState } from 'react';
import {
	Container,
	BgImg,
	Content,
	BgWrap,
	P,
	H1,
	BtnWrap,
	Btn,
	Icon,
	HoverIcon,
	TextWrap,
} from './styled';
import VehicleIMG from '/assets/images/main-image.png';
import styled from 'styled-components';
import Orange from './orange.svg';

const HeroSection = () => {
	const [isBtnHover, setIsBtnHover] = useState(false);

	const btnHover = () => {
		setIsBtnHover(!isBtnHover);
	};

	return (
		<Container>
			<BgWrap>
				<BgImg src={VehicleIMG} />
			</BgWrap>

			<Content>
				<Images src={Orange} />
				<TextWrap>
					<H1>
						식당 예약 관리, 마감 임박한 숙박권, 관광지 티켓을 NFT를 통해 빠르고 쉽게 판매하세요
					</H1>
				</TextWrap>

				<BtnWrap>
					<Btn to="/mint" onMouseEnter={btnHover} onMouseLeave={btnHover}>
						시작하기
						{isBtnHover ? <Icon /> : <HoverIcon />}
					</Btn>
				</BtnWrap>
			</Content>
		</Container>
	);
};

export default HeroSection;

const Images = styled.img`
	z-index: 999;
`;
