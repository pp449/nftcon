import { Route, Routes } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import AuthTokenForm from './components/AuthTokenForm';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ItemInfoPage from './pages/ItemInfoPage';
import MintPage from './pages/MintPage';
import MyPage from './pages/MyPage';

const staticServerUrl = import.meta.env.VITE_URL;

function App() {
	return (
		<>
			<Navbar />
			<MainContainer>
				<Routes>
					<Route path="/">
						<Route path={staticServerUrl + "/"} element={<HomePage />} />
						<Route path={staticServerUrl + "/authtoken"} element={<AuthTokenForm />} />
						<Route path={staticServerUrl + "/mint"} element={<MintPage />} />
						<Route path={staticServerUrl + "/mypage"} element={<MyPage />} />
						<Route path={staticServerUrl + "/item/:itemId"} element={<ItemInfoPage />} />
					</Route>
				</Routes>
			</MainContainer>
		</>
	);
}

export default App;
