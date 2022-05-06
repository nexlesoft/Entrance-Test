import './App.css';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
	const theme = useTheme();
	const [data, setData] = useState([]);

	const [page, setPage] = useState(0);
	const listInnerRef = useRef();

	const API_URL = 'https://www.pinkvilla.com/photo-gallery-feed-page';

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: response } = await axios.get(`${API_URL}/page/${page}`);
				const newData = data.concat(response.nodes);
				setData(newData);
			} catch (error) {
				console.error(error.message);
			}
		};
		fetchData();
	}, [page]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, [data.length]);

	const handleScroll = (e) => {
		if (listInnerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
			if (scrollTop + clientHeight - 1 === scrollHeight) {
				const nextpage = page + 1;
				setPage(nextpage);
			}
		}
	};
	return (
		<div id="list" onScroll={handleScroll} ref={listInnerRef}>
			{data?.map((item) => (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Card
						sx={{
							display: 'flex',
							width: '50%',
							alignItems: 'center',
						}}
					>
						<CardMedia
							component="img"
							sx={{ width: 151 }}
							image="https://ps-attachments.s3.amazonaws.com/cc810a17-c903-405a-b914-be7622637dc2/ixTAUT5DNBKQzZaBAixIkA.jpg"
							alt="Live from space album cover"
						/>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography component="div" variant="h5">
									{item.node.title}
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div"
								>
									{item.node.path}
								</Typography>
							</CardContent>
							<Box
								sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
							></Box>
						</Box>
					</Card>
				</div>
			))}
		</div>
	);
};

export default PhotoGallery;
