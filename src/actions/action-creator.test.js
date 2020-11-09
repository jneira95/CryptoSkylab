import { ContactSupportOutlined } from '@material-ui/icons';
import axios from 'axios';
import dispatcher from '../dispatcher/dispatcher';
import {
	loadCoinsList,
	saveOnFavoriteList,
	removeFromFavoriteList
} from './action-creator';

jest.mock('axios');
jest.mock('../dispatcher/dispatcher');

describe('Test ActionCreator file', () => {
	test('Should return array of currencies', async () => {
		//arrange
		axios.mockImplementationOnce(() =>
			Promise.resolve({
				data: [
					{ id: 'bitcoin', name: 'Bitcoin', symbol: 'btc' },
					{ id: 'ethereum', name: 'Ethereum', symbol: 'eth' },
					{ id: 'tether', name: 'Tether', symbol: 'usdt' },
					{ id: 'litcoin', name: 'Litcoin', symbol: 'ltc' }
				]
			})
		);
		//act
		await loadCoinsList(4, 1);
		console.log(axios.mock.calls[0][0]);
		//assert
		expect(axios.mock.calls[1][0]).toBe(1);
	});
});
