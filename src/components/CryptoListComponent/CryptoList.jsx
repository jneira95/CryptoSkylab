import React, { useEffect, useState } from 'react';
import cryptoStore from '../../stores/crypto-store';
import { loadCoinsList } from '../../actions/action-creator';
import CryptoListTableInfo from './CryptoListTableInfo';
function CryptoList() {
	const [cryptoList, setCryptoList] = useState(null);

	function handleChange() {
		setCryptoList(cryptoStore.getCryptoList);
	}

	useEffect(() => {
		cryptoStore.addEventListener(handleChange);
		!cryptoList && loadCoinsList();
		return () => {
			cryptoStore.removeEventListener(handleChange);
		};
	});

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
				</section>
			)}
		</>
	);
}

export default CryptoList;
