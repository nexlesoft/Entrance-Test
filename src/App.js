import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const PhotoGallery = () => {
	const API_URL = 'https://www.pinkvilla.com/photo-gallery-feed-page';
	const DOMAIN_NAME = 'https://www.pinkvilla.com/';

	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);

		try {
			const { data: response } = await axios.get(`${API_URL}/page/${page}`);
			const newData = data.concat(response.nodes);
			setData(newData);
		} catch (error) {
			console.error(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	return (
		<div id="scrollableDiv">
			<InfiniteScroll
				// inverse
				dataLength={data.length}
				next={() => {
					setPage(page + 1);
				}}
				hasMore={true}
				scrollableTarget="scrollableDiv"
				scrollThreshold={0.9}
			>
				{data?.map((item) => (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Grid container sx={{ width: '40%', height: 200 }}>
							<Grid
								xs={4}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<CardMedia
									component="img"
									sx={{ width: 250, height: 180, borderRadius: 10 }}
									image={`${DOMAIN_NAME}/${item.node.field_photo_image_section}`}
									alt="Live from space album cover"
								/>
							</Grid>
							<Grid xs={8}>
								<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									<CardContent sx={{ flex: '1 0 auto' }}>
										<Typography component="div" variant="h5">
											{item.node.title}
										</Typography>
										<Typography
											variant="subtitle1"
											color="text.secondary"
											component="div"
										></Typography>
									</CardContent>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											pl: 1,
											pb: 1,
										}}
									></Box>
								</Box>
							</Grid>
						</Grid>
					</div>
				))}
				{loading && (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				)}
			</InfiniteScroll>
		</div>
	);
};

export default PhotoGallery;
