import React, { useEffect, useState } from 'react';
import cryptoStore from '../../stores/crypto-store';
import { loadCoinsList } from '../../actions/action-creator';
import CryptoListTableInfo from './CryptoListTableInfo';
function CryptoList() {
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
					<button
						type="button"
						onClick={() => {
							loadCoinsList(currentItemsPerPage, currentPage + 1);
							setCurrentPage(currentPage + 1);
						}}
					>
						next
					</button>
					<button
						type="button"
						onClick={() => {
							console.log(currentPage);
							if (currentPage > 1) {
								loadCoinsList(currentItemsPerPage, currentPage - 1);
								setCurrentPage(currentPage - 1);
							}
							console.log(`--->${currentPage}`);
						}}
					>
						previous
					</button>
					<form>
						<select
							name="items"
							id="itemstoshow"
							onChange={(event) => {
								loadCoinsList(event.target.value, currentPage);
								console.log(event.target.value);
							}}
						>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
					</form>
				</section>
			)}
		</>
	);
}

export default CryptoList;
