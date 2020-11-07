import React, { useEffect, useState } from 'react';
import './CryptoList.css';
import { loadCoinsList } from '../../actions/action-creator';
import cryptoStore from '../../stores/crypto-store';
import CryptoListTableInfo from './CryptoListTableInfo';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1)
	},
	extendedIcon: {
		marginRight: theme.spacing(2)
	}
}));
function CryptoList() {
	const classes = useStyles();
	const [cryptoList, setCryptoList] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentItemsPerPage] = useState(25);
	function handleChange() {
		setCryptoList(cryptoStore.getCryptoList);
	}
	useEffect(() => {
		cryptoStore.addEventListener(handleChange);
		!cryptoList && loadCoinsList();
		return () => {
			cryptoStore.removeEventListener(handleChange);
		};
	}, [cryptoList, currentPage, currentItemsPerPage]);

	return (
		<>
			{cryptoList && (
				<section>
					<table>
						<caption>Today's Cryptocurrency Prices by Market Cap</caption>
						<thead>
							<tr>
								<th>Watchlist</th>
								<th>#</th>
								<th>Name</th>
								<th>Price</th>
								<th>24h</th>
								<th>Last 7 Days</th>
								<th>Market Cap</th>
								<th>Circulating Supply</th>
							</tr>
						</thead>
						<tbody>
							{cryptoList.map((cryptoCoinData) => {
								return (
									<CryptoListTableInfo
										data={cryptoCoinData}
										key={cryptoCoinData.id}
									/>
								);
							})}
						</tbody>
					</table>
					<Button
						size="small"
						variant="contained"
						color="primary"
						type="button"
						onClick={async () => {
							if (currentPage > 1) {
								await loadCoinsList(currentItemsPerPage, currentPage - 1);
								setCurrentPage(currentPage - 1);
								document.documentElement.scrollTop = 0;
							}
						}}
					>
						{`<`}
					</Button>
					<Button
						className={classes.margin}
						size="small"
						variant="contained"
						color="primary"
						type="button"
						onClick={async () => {
							await loadCoinsList(currentItemsPerPage, currentPage + 1);
							setCurrentPage(currentPage + 1);
							document.documentElement.scrollTop = 0;
						}}
					>
						{`>`}
					</Button>

					<form>
						<select
							name="items"
							id="itemstoshow"
							onChange={async (event) => {
								await loadCoinsList(event.target.value, currentPage);
								console.log(event.target.value);
								document.documentElement.scrollTop = 0;
							}}
						>
							<option value={100}>100</option>
							<option value={50}>50</option>
							<option value={25}>25</option>
						</select>
					</form>
				</section>
			)}
		</>
	);
}

export default CryptoList;
