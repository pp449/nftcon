import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { mintERC721, uploadMediaFile, uploadMetadata } from '../apis/nft';
import { KEYS } from '../states/keys';
import { PropertiesState } from '../states/recoil/properties';
import { AccountsState } from '../states/recoil/accounts';
import { getNowYYYYMMDD } from '../utils';
import Config from '../utils/config';

const useMint = (inputData: NFTInputData) => {
	const navigate = useNavigate();
	const properties = useRecoilValue(PropertiesState);
	const accounts = useRecoilValue(AccountsState);

	return useMutation(
		[KEYS.ASYNC_NFT_MINT, inputData],
		async () => {
			let metadataId;
			if (!inputData.metadataId) {
				const mediaId = await uploadMediaFile(inputData.image);
				if (!mediaId) return null;

				metadataId = await uploadMetadata({
					name: inputData.name,
					description: inputData.description,
					maxMintLimit: inputData.maxMintLimit,
					image: mediaId,
					createdDate: getNowYYYYMMDD(),
					properties: [
						{
							displayType: 'string',
							type: 'location',
							value: inputData.location,
						},
						{
							displayType: 'number',
							type: 'price',
							value: inputData.price.toString(),
						},
					],
					onChainProperties: {} as Property,
				});
				if (!metadataId) return null;
			} else metadataId = inputData.metadataId;

			const nft = await mintERC721(metadataId, inputData.editionNo, accounts[0]);
			return nft;
		},
		{
			retry: false,
			onSuccess: async (data) => {
				setTimeout(async () => {
					const res = await axios.get(
						`https://api.luniverse.io/svc/v2/nft/contracts/${Config.CONTRACT_ID}/tokens/${data.data.data.token.id}`,
						{
							headers: {
								Authorization: `Bearer ${Config.AUTH_TOKEN}`,
							},
						}
					);
					const tokenId = res.data.data.token.tokenId;
					const price = res.data.data.token.metadata.properties[1].value;
					console.log(tokenId, price);
					axios.post(Config.SERVER_URL + '/saleNFT', {
						data: {
							nftInfo: {
								Info: {
									contractAddress: Config.CONTRACT_ID,
									tokenId,
									price,
									discount_rate: Math.floor(Math.random() * 20),
								},
							},
						},
					});
				}, 4000);
				alert('판매등록 완료!');
				navigate('/mypage');
			},
			onError: (error: AxiosError<AxiosErrorData>) => {
				alert(`판매등록 실패. \n${error.message}\n${error.response?.data.message}`);
				window.location.reload();
			},
		}
	);
};

export default useMint;
