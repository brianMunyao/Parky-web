import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import BaseTab from '../components/BaseTab';
import { testDevTools } from '../config/apis';
import { getTimeDiff } from '../config/utils';

const DevTools = ({ active }) => {
	const [resImage, setResImage] = useState(null);
	const [tools, setTools] = useState([
		{
			tool: 'maskrcnn',
			title: 'MaskRCNN Test',
			subtitle: 'Test the segmentation model',
			loading: false,
		},
		{
			tool: 'anpr',
			title: 'ANPR Test',
			subtitle: 'Detect license plate numbers',
			loading: false,
		},
	]);

	const testDev = (e, toolToTest) => {
		if (e.target.files.length === 0) return;
		const toolOn = tools.map((t) =>
			t.tool === toolToTest ? { ...t, loading: true } : t
		);
		setTools(toolOn);

		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('toolToTest', toolToTest);

		const startTime = moment();
		testDevTools(formData)
			.then((res) => {
				if (res.data) {
					toast.success(
						`Time Taken: ${getTimeDiff(moment(), startTime)}`
					);
					if (toolToTest === 'anpr')
						toast.success(`License Found: ${res.license}`);

					setResImage(res.data);
				} else {
					toast.error(res.error);
				}

				const toolOff = tools.map((t) =>
					t.tool === toolToTest ? { ...t, loading: false } : t
				);
				setTools(toolOff);
			})
			.catch((err) => toast.error('Server Error'));
	};

	return (
		<Container>
			<BaseTab title="Developer Tools" active={active}>
				<div className="devtools">
					{tools.map(({ tool, title, subtitle, loading }, i) => (
						<label htmlFor={tool} key={i}>
							<div className="tools">
								<input
									id={tool}
									name={tool}
									type="file"
									onChange={(e) => testDev(e, tool)}
								/>
								<p className="dt-title">{title}</p>
								<p className="dt-subtitle">{subtitle}</p>
							</div>
						</label>
					))}
				</div>
				<div className="dev-response">
					{resImage && (
						<img
							className="status-image"
							src={`data:image/jpeg;base64,${resImage}`}
							alt="test_image"
						/>
					)}
				</div>
			</BaseTab>
		</Container>
	);
};

const Container = styled.div`
	.devtools {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fit, 220px);

		label {
			position: relative;
		}

		.tools {
			background: white;
			padding: 15px;
			cursor: pointer;
			transition: all 0.2s linear;

			&:hover {
				transform: scale(1.01);
			}

			input {
				position: absolute;
				width: 0;
				height: 0;
			}

			.dt-title {
				font-size: 17px;
				font-weight: 600;
				opacity: 0.7;
			}
			.dt-subtitle {
				padding-top: 5px;
				color: grey;
			}
		}
	}
	.dev-response {
		padding: 10px;
		img {
			width: 100%;

			height: auto;
		}
	}
`;

export default DevTools;
