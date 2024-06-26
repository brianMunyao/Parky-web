import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { GiGearStickPattern } from 'react-icons/gi';
import { TbBarrierBlock } from 'react-icons/tb';
import { HiOutlineTemplate, HiCode } from 'react-icons/hi';
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
import { updateAppWidth } from '../store/mainSlice';
import { getAccesses, getLocations } from '../config/apis';
import { setAccesses } from '../store/accessesSlice';
import { setLocations } from '../store/occupancySlice';
import DevTools from './DevTools';

const pages = [
	{ label: 'Dashboard', Page: DashBoard, Icon: HiOutlineTemplate },
	{ label: 'Access Control', Page: AccessControl, Icon: TbBarrierBlock },
	{ label: 'Occupancy', Page: Occupancy, Icon: GiGearStickPattern },
	// { label: 'Settings', Page: Settings, Icon: HiOutlineCog },
];

const HomeScreen = () => {
	const [cookies, removeCookie] = useCookies(['user']);
	const [activeTab, setActiveTab] = useState(0);

	const { appWidth } = useSelector((state) => state.mainReducer);
	const dispatch = useDispatch();

	const initialFetch = useCallback(() => {
		if (isLoggedIn(cookies)) {
			getAccesses(cookies.user.id)
				.then((res) => {
					if (res.data) {
						dispatch(
							setAccesses(sortByDate(res.data, 'entry_time'))
						);
					} else {
						toast.error(res.error);
					}
				})
				.catch((err) =>
					toast.error('Server unreachable. Try again later.')
				);

			getLocations()
				.then((res) => dispatch(setLocations(res.data)))
				.catch((err) =>
					console.log('Server unreachable. Try again later.')
				);
		}
	}, [dispatch, cookies]);

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
	) : (
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

				<div>
					<NavItem
						dev
						active={activeTab === pages.length + 1}
						label="Developer Tools"
						Icon={HiCode}
						onClick={() => changeTab(pages.length + 1)}
					/>
					<NavItem
						logout
						key={pages.length + 2}
						label="Log Out"
						Icon={IoPower}
						onClick={() => removeCookie('user')}
					/>
				</div>
			</nav>
			<main>
				<div className="main-inner">
					{pages.map(({ Page }, i) => (
						<Page active={i === activeTab} />
					))}
					<DevTools active={pages.length + 1 === activeTab} />
				</div>
			</main>
		</Container>
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
