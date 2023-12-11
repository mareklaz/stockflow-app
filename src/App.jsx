import { Fragment, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingContext from './context/LoadingContext';
import LoadingBar from 'react-top-loading-bar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Login from './pages/Login/Login.jsx';
import UsersCreate from './pages/Users/UsersCreate.jsx';
import UsersLayout from './pages/Users/UsersLayout.jsx';
import UsersList from './pages/Users/UsersList.jsx';
import UsersEdit from './pages/Users/UsersEdit.jsx';
import ProvidersLayout from './pages/Providers/ProvidersLayout.jsx';
import ProvidersCreate from './pages/Providers/ProvidersCreate.jsx';
import ProvidersList from './pages/Providers/ProvidersList.jsx';
import ProvidersEdit from './pages/Providers/ProvidersEdit.jsx';
import TaxesLayout from './pages/Tax/TaxesLayout.jsx';
import TaxesCreate from './pages/Tax/TaxesCreate.jsx';
import TaxesList from './pages/Tax/TaxesList.jsx';
import TaxesEdit from './pages/Tax/TaxesEdit.jsx';
import CategoriesLayout from './pages/Categories/CategoriesLayout.jsx';
import CategoriesCreate from './pages/Categories/CategoriesCreate.jsx';
import CategoriesList from './pages/Categories/CategoriesList.jsx';
import CategoriesEdit from './pages/Categories/CategoriesEdit.jsx';
import ProductsLayout from './pages/Products/ProductsLayout.jsx';
import ProductsCreate from './pages/Products/ProductsCreate.jsx';
import ProductsEdit from './pages/Products/ProductsEdit.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ProductsList from './pages/Products/ProductsList.jsx';
import NotFound from './pages/Notfound/NotFound.jsx';
import SidebarNav from './components/SidebarNav/SidebarNav.jsx';

function App() {
	const { isLoadingContext, setIsLoadingContext } = useContext(LoadingContext);

	return (
		<Fragment>
			<LoadingBar
				color='#6366f1'
				height={5}
				waitingTime={200}
				progress={isLoadingContext ? 100 : 0}
				onLoaderFinished={() => {}}
			/>

			<SidebarNav>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/dashboard'
						element={<Dashboard />}
					/>
					<Route
						path='/users'
						element={<UsersLayout />}>
						<Route
							path='create'
							element={<UsersCreate />}
						/>
						<Route
							path='list'
							element={<UsersList />}
						/>
						<Route
							path=':id/edit'
							element={<UsersEdit />}
						/>
					</Route>
					<Route
						path='/providers'
						element={<ProvidersLayout />}>
						<Route
							path='create'
							element={<ProvidersCreate />}
						/>
						<Route
							path='list'
							element={<ProvidersList />}
						/>
						<Route
							path=':id/edit'
							element={<ProvidersEdit />}
						/>
					</Route>
					<Route
						path='/taxes'
						element={<TaxesLayout />}>
						<Route
							path='create'
							element={<TaxesCreate />}
						/>
						<Route
							path='list'
							element={<TaxesList />}
						/>
						<Route
							path=':id/edit'
							element={<TaxesEdit />}
						/>
					</Route>
					<Route
						path='/categories'
						element={<CategoriesLayout />}>
						<Route
							path='create'
							element={<CategoriesCreate />}
						/>
						<Route
							path='list'
							element={<CategoriesList />}
						/>
						<Route
							path=':id/edit'
							element={<CategoriesEdit />}
						/>
					</Route>
					<Route
						path='/products'
						element={<ProductsLayout />}>
						<Route
							path='create'
							element={<ProductsCreate />}
						/>
						<Route
							path='list'
							element={<ProductsList />}
						/>
						<Route
							path=':id/edit'
							element={<ProductsEdit />}
						/>
					</Route>
					<Route
						path='/profile'
						element={<Profile />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</SidebarNav>
		</Fragment>
	);
}

export default App;
