import axios from 'axios';
import actionTypes from '../actions/action-types';
import dispatcher from '../dispatcher/disptacher';

export async function loadCoinsList() {
	try {
		const coinsList = await axios.request(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h'
		);
		console.log(coinsList);
		dispatcher.dispatch({
			type: actionTypes.LOAD_COINS_LIST,
			payload: coinsList.data
		});
	} catch (error) {
		dispatcher.dispatch({
			type: actionTypes.ERROR_LOADING_DATA,
			payload: error
		});
	}
}