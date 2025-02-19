import React, { useEffect, useRef, useState } from 'react';
import './CryptoList.css';
import { loadCoinsList } from '../../actions/action-creator';
import cryptoStore from '../../stores/crypto-store';
import CryptoListTableInfo from './CryptoListTableInfo';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles((theme) => ({
	table: {
		color: theme.palette.primary.contrastText
	}
}));

function CryptoList() {
	const classes = useStyles();
	const showRows = useRef([25, 50, 100]);
	const [cryptoList, setCryptoList] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [currentItemsPerPage, setCurrentItemsPerPage] = useState(25);
	const [checkbox, setCheckbox] = useState(false);
	const [favoriteCurrencies, setFavoriteCurrencies] = useState(
		cryptoStore.getFavoriteCurrencies
	);

	const handleChangeFavorite = () => {
		setFavoriteCurrencies(cryptoStore.getFavoriteCurrencies);
	};
	const handleChangePage = async (event, newPage) => {
		event.type === 'click' &&
			(await loadCoinsList(currentItemsPerPage, newPage + 1));
		setCurrentPage(newPage + 1);
		setPageCount(newPage);
	};
	const handleChangeRowsPerPage = async (event) => {
		await loadCoinsList(event.target.value, currentPage);
		setCurrentItemsPerPage(event.target.value);
	};

	useEffect(() => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		function handleChange() {
			setCryptoList(cryptoStore.getCryptoList());
		}
		cryptoStore.addEventListener(handleChange);
		!cryptoList && loadCoinsList(currentItemsPerPage, currentPage);
		return () => {
			cryptoStore.removeEventListener(handleChange);
		};
	}, [cryptoList, currentPage, currentItemsPerPage, favoriteCurrencies]);

	return (
		<>
			{cryptoList && (
				<section className="list-wrapper">
					<table className="list-table">
						<caption className="list-table-title">
							Today's Cryptocurrency Prices by Market Cap
						</caption>
						<thead className="list-table-heading">
							<tr>
								<th>
									<form>
										<input
											type="checkbox"
											onChange={() => {
												if (!checkbox) {
													handleChangeFavorite();
													setCheckbox(true);
												} else {
													setCheckbox(false);
												}
											}}
										/>
									</form>
								</th>
								<th>#</th>
								<th>Name</th>
								<th>Price</th>
								<th>24h</th>
								<th>Last 7 Days</th>
								<th>Market Cap</th>
								<th>Circulating Supply</th>
							</tr>
						</thead>
						<tbody className="list-table-body">
							{!checkbox ? (
								cryptoList.map((cryptoCoinData) => {
									return (
										<CryptoListTableInfo
											data={cryptoCoinData}
											key={cryptoCoinData.id}
										/>
									);
								})
							) : checkbox && favoriteCurrencies.length > 0 ? (
								favoriteCurrencies.map((cryptoCoinData) => {
									return (
										<CryptoListTableInfo
											data={cryptoCoinData}
											onChange={() => {
												setFavoriteCurrencies(
													cryptoStore.getFavoriteCurrencies
												);
											}}
											key={cryptoCoinData.id}
										/>
									);
								})
							) : (
								<tr>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
								</tr>
							)}
						</tbody>
					</table>
					<section className="pagination">
						{!checkbox && (
							<TablePagination
								className={classes.table}
								component="div"
								count={1000}
								page={pageCount}
								labelRowsPerPage={'Show rows'}
								rowsPerPageOptions={showRows.current}
								rowsPerPage={currentItemsPerPage}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						)}
					</section>
				</section>
			)}
		</>
	);
}

export default CryptoList;
