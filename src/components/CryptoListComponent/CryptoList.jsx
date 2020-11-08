import React, { useEffect, useState } from 'react';
import './CryptoList.css';
import { loadCoinsList } from '../../actions/action-creator';
import cryptoStore from '../../stores/crypto-store';
import CryptoListTableInfo from './CryptoListTableInfo';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1)
	},
	extendedIcon: {
		marginRight: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 50
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));
function CryptoList() {
	const classes = useStyles();
	const [cryptoList, setCryptoList] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentItemsPerPage, setCurrentItemsPerPage] = useState(25);

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
				<section className="list-wrapper">
					<table className="list-table">
						<caption className="list-table-title">
							Today's Cryptocurrency Prices by Market Cap
						</caption>
						<thead className="list-table-heading">
							<tr>
								<th></th>
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
								document.body.scrollTop = 0;
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
							document.body.scrollTop = 0;
							document.documentElement.scrollTop = 0;
						}}
					>
						{`>`}
					</Button>
					<FormControl className={classes.formControl}>
						<NativeSelect
							className={classes.selectEmpty}
							onChange={async (event) => {
								if (event.target.value) {
								}
								await loadCoinsList(event.target.value, currentPage);
								setCurrentItemsPerPage(event.target.value);
								document.body.scrollTop = 0;
								document.documentElement.scrollTop = 0;
							}}
						>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</NativeSelect>
						<FormHelperText>Show rows</FormHelperText>
					</FormControl>
				</section>
			)}
		</>
	);
}

export default CryptoList;
