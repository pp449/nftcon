import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyNFTs from '../../hooks/useGetMyNFTs';
import Empty from '../Empty';
import Loading from '../Loading';

import {
	Container,
	Content,
	Divider,
	ItemH1,
	ItemH3,
	ItemImg,
	ItemImgBox,
	ItemTextBox,
	ItemTextWrap,
	ItemWrap,
} from './styled';
import styled from 'styled-components';

const MyItem = () => {
	const [myNFTs, setMyNFTs] = useState([] as NFTItem[]);
	const getMyNFTs = useGetMyNFTs();
	const navigate = useNavigate();

	const handleOnClickItem = (itemId: string) => {
		navigate(`/item/${itemId}`);
	};

	useEffect(() => {
		if (!!getMyNFTs.data)
			setMyNFTs(getMyNFTs.data.items.sort((a, b) => Number(b.tokenId) - Number(a.tokenId)));
	}, [getMyNFTs.isFetching]);

	if (getMyNFTs.data?.count === '0')
		return (
			<>
				<Empty />
			</>
		);

	if (getMyNFTs.isFetching || getMyNFTs.isLoading) return <Loading />;

	return (
		<>
			<Container>
				<Text>판매중인 상품들</Text>
				<Content>
					{myNFTs.map((item) => {
						if (item.tokenId === 'unknown' && !getMyNFTs.isFetching) getMyNFTs.refetch();
						return (
							<ItemWrap key={item.id} onClick={() => handleOnClickItem(item.id)}>
								<ItemImgBox>
									<ItemImg src={item.metadata.image} />
								</ItemImgBox>
								<Divider />
								<ItemTextWrap>
									<ItemTextBox>
										<ItemH1>{item.metadata.name}</ItemH1>
									</ItemTextBox>
									<ItemTextBox>
										<ItemH3>설명</ItemH3>
										<ItemH3>{item.metadata.description}</ItemH3>
									</ItemTextBox>
									<ItemTextBox>
										<ItemH3>금액</ItemH3>
										<ItemH3>
											{item.metadata.properties[1] ? item.metadata.properties[1].value : '가격미상'}
										</ItemH3>
									</ItemTextBox>
								</ItemTextWrap>
							</ItemWrap>
						);
					})}
				</Content>
			</Container>
		</>
	);
};

export default MyItem;

const Text = styled.p`
	font-size: 2rem;
	margin-bottom: 1rem;
`;
