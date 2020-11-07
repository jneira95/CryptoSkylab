import React, { useEffect, useState } from 'react';
import './CryptoList.css';
import { loadCoinsList } from '../../actions/action-creator';
import cryptoStore from '../../stores/crypto-store';
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
							if (currentPage > 1) {
								loadCoinsList(currentItemsPerPage, currentPage - 1);
								setCurrentPage(currentPage - 1);
								document.documentElement.scrollTop = 0;
							}
						}}
					>
						{`<`}
					</button>
					<button
						type="button"
						onClick={() => {
							loadCoinsList(currentItemsPerPage, currentPage + 1);
							setCurrentPage(currentPage + 1);
							document.documentElement.scrollTop = 0;
						}}
					>
						{`>`}
					</button>

					<form>
						<select
							name="items"
							id="itemstoshow"
							onChange={(event) => {
								debugger;
								loadCoinsList(event.target.value, currentPage);
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
