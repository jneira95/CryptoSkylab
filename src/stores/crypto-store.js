import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/disptacher';
import actionTypes from '../actions/action-types';

const CHANGE = 'CHANGE';

const currentServerData = {
	cryptoCurrenciesList: null
};

class CryptoStore extends EventEmitter {
	getCryptoList() {
		return currentServerData.cryptoCurrenciesList;
	}

	roundBigNumbers(num, locale = 'en') {
		// Nine Zeroes for Billions
		return Math.abs(Number(num)) >= 1.0e9
			? Math.round(Math.abs(Number(num)) / 1.0e9) + ' B'
			: // Six Zeroes for Millions
			Math.abs(Number(num)) >= 1.0e6
			? Math.round(Math.abs(Number(num)) / 1.0e6) + ' M'
			: // Three Zeroes for Thousands
			Math.abs(Number(num)) >= 1.0e3
			? Math.round(Math.abs(Number(num)) / 1.0e3) + ' K'
			: Math.abs(Number(num));
	}

	addEventListener(callback) {
		this.on(CHANGE, callback);
	}

	removeEventListener(callback) {
		this.removeListener(CHANGE, callback);
	}

	emitChange() {
		this.emit(CHANGE);
	}
}

const cryptoStore = new CryptoStore();

dispatcher.register((action) => {
	switch (action.type) {
		case actionTypes.LOAD_COINS_LIST:
			currentServerData.cryptoCurrenciesList = action.payload;
			cryptoStore.emitChange();
			break;
		default:
			break;
	}
});

export default cryptoStore;

