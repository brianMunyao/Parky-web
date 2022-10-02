import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { GiGearStickPattern } from 'react-icons/gi';
import { TbBarrierBlock } from 'react-icons/tb';
import { HiOutlineTemplate, HiOutlineCog } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { IoPower } from 'react-icons/io5';
import { toast } from 'react-toastify';

import { isLoggedIn, sortByDate } from '../config/utils';
import Logo from '../components/Logo';
import NavItem from '../components/NavItem';
import DashBoard from './DashBoard';
import Settings from './Settings';
import Occupancy from './Occupancy';
import AccessControl from './AccessControl';
import UserHomeScreen from './UserHomeScreen';
import { updateAppWidth } from '../store/mainSlice';
import { getAccesses, getLocations, getParkingMap } from '../config/apis';
import { updateAccesses } from '../store/accessesSlice';
import { updateLocations, updateOccupancyMap } from '../store/occupancySlice';

const pages = [
	{ label: 'Dashboard', Page: DashBoard, Icon: HiOutlineTemplate },
	{ label: 'Access Control', Page: AccessControl, Icon: TbBarrierBlock },
	{ label: 'Occupancy', Page: Occupancy, Icon: GiGearStickPattern },
	{ label: 'Settings', Page: Settings, Icon: HiOutlineCog },
];

const HomeScreen = () => {
	const [cookies] = useCookies(['user']);
	const [activeTab, setActiveTab] = useState(0);

	const { appWidth } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();

	const initialFetch = useCallback(() => {
		getAccesses()
			.then((res) => {
				if (res.data) {
					dispatch(
						updateAccesses(sortByDate(res.data, 'entry_time'))
					);
				} else {
					toast.error(res.error);
				}
			})
			.catch((err) => toast.error(`api call error, ${err}`));

		getLocations()
			.then((res) => dispatch(updateLocations(res.data)))
			.catch((err) => console.log('Locations:', err));

		getParkingMap()
			.then((res) => {
				dispatch(updateOccupancyMap(res.data));
			})
			.catch((err) => console.log('Occupancy:', err));
	}, [dispatch]);

	useEffect(() => {
		dispatch(updateAppWidth(window.innerWidth));
		window.addEventListener('resize', () =>
			dispatch(updateAppWidth(window.innerWidth))
		);

		initialFetch();
	}, [dispatch, initialFetch]);

	const changeTab = (id) => setActiveTab(id);

	return !isLoggedIn(cookies) ? (
		<Navigate to="/login" />
	) : cookies.user.role === 'admin' ? (
		<Container>
			<nav>
				<div>
					<div className="hs-logo">
						{appWidth > 720 ? (
							<Logo full height={30} />
						) : (
							<Logo height={30} />
						)}
					</div>
					{pages.map((v, i) => (
						<NavItem
							key={i}
							active={activeTab === i}
							label={v.label}
							Icon={v.Icon}
							onClick={() => changeTab(i)}
						/>
					))}
				</div>

				<NavItem
					logout
					key={pages.length + 1}
					label="Log Out"
					Icon={IoPower}
					onClick={() => alert('logout')}
				/>
			</nav>

			<main>
				<div className="main-inner">
					{pages.map(({ Page }, i) => (
						<Page active={i === activeTab} />
					))}
				</div>
			</main>
		</Container>
	) : (
		<UserHomeScreen />
	);
};

const Container = styled.div`
	height: 100vh;
	min-height: 500px;
	position: relative;

	nav,
	main {
		transition: all 0.2s linear;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	nav {
		padding: 0 0 10px;
		background: white;
		left: 0;
		width: 200px;
		z-index: 1;
		/* box-shadow: 1px 1px 5px #f9f9f9; */
		border-right: 1.5px solid #f2f2f2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.hs-logo {
			display: flex;
			justify-content: center;
			margin: 20px 0 30px;
		}
	}

	main {
		right: 0;
		left: 200px;
		background: #f2f5f8;

		.main-inner {
			position: relative;
			height: 100%;
			overflow-y: auto;
		}
	}

	@media (max-width: 720px) {
		nav {
			width: 62px;
		}
		main {
			left: 62px;
		}
	}
`;

export default HomeScreen;
