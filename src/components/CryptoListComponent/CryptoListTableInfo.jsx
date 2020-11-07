import React, { useEffect, useState } from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

function CryptoListTableInfo({ data }) {
	const [checked, setChecked] = useState(false);

	const currentTableData = {
		id: data.id ? data.id : 'N/A',
		rank: data.market_cap_rank ? data.market_cap_rank : 'N/A',
		name: data.name ? data.name : 'N/A',
		symbol: data.symbol ? data.symbol.toUpperCase() : 'N/A',
		image: data.image
			? data.image
			: 'https://cdn0.iconfinder.com/data/icons/mono2/100/not-allowed-512.png',
		currentPrice: data.current_price
			? `€${data.current_price.toLocaleString()}`
			: 'N/A',
		market24h: data.market_cap_change_percentage_24h
			? data.market_cap_change_percentage_24h
			: 'N/A',
		market24hValueColor:
			Math.sign(data.market_cap_change_percentage_24h) === 1
				? 'positive'
				: 'negative',
		sparkline: data.sparkline_in_7d.price
			? [...data.sparkline_in_7d.price]
			: [1, 1, 1, 1, 1, 1, 1],
		marketCap: data.market_cap ? `€${data.market_cap.toLocaleString()}` : 'N/A',
		circulatingSupply: data.circulating_supply.toLocaleString()
	};
	return (
		<>
			<tr key={currentTableData.id}>
				<td>
					<form>
						<input type="checkbox" />
					</form>
				</td>
				<td>{currentTableData.rank}</td>
				<td className="logo-crytolist-image">
					<img src={currentTableData.image} alt="crypto-logo" />
					{`${currentTableData.name} ${currentTableData.symbol}`}
				</td>
				<td>{currentTableData.currentPrice}</td>
				<td className={currentTableData.market24hValueColor}>
					{currentTableData.market24h}
				</td>
				<td>
					<span>
						<Sparklines data={currentTableData.sparkline} height={80}>
							<SparklinesLine
								style={{
									stroke: '#0a66cf',
									strokeWidth: '2',
									fill: 'none'
								}}
							/>
							<SparklinesSpots />
						</Sparklines>
					</span>
				</td>
				<td>{currentTableData.marketCap}</td>
				<td>{`${currentTableData.circulatingSupply} ${currentTableData.symbol}`}</td>
			</tr>
		</>
	);
}

export default CryptoListTableInfo;
