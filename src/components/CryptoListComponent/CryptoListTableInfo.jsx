import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

function CryptoListTableInfo({ data }) {
	const currentTableData = {
		id: data.id,
		rank: data.market_cap_rank,
		name: data.name,
		symbol: data.symbol.toUpperCase(),
		image: data.image,
		currentPrice: data.current_price.toLocaleString(),
		market24h: data.market_cap_change_percentage_24h.toFixed(2),
		sparkline: data.sparkline_in_7d.price,
		circulatingSupply: data.circulating_supply.toLocaleString()
	};

	return (
		<>
			<tr key={currentTableData.id}>
				<td>{currentTableData.rank}</td>
				<td>
					<img src={currentTableData.image} alt="crypto-logo" />
					{`${currentTableData.name} ${currentTableData.symbol}`}
				</td>
				<td>{`${currentTableData.currentPrice}€`}</td>
				<td>{currentTableData.market24h}</td>
				<td>
					<span>
						<Sparklines data={currentTableData.sparkline} height={80}>
							<SparklinesLine
								style={{ stroke: '#d1192e', strokeWidth: '2', fill: 'none' }}
							/>
							<SparklinesSpots />
						</Sparklines>
					</span>
				</td>
				<td>pruebas</td>
				<td>{`${currentTableData.circulatingSupply} ${currentTableData.symbol}`}</td>
			</tr>
		</>
	);
}

export default CryptoListTableInfo;


