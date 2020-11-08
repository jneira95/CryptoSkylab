import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';
import actionTypes from '../actions/action-types';

const CHANGE = 'CHANGE';

const currentServerData = {
	cryptoCurrenciesList: null
};

class CryptoStore extends EventEmitter {
	getCryptoList() {
		return currentServerData.cryptoCurrenciesList;
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
		case actionTypes.ERROR_LOADING_DATA:
			currentServerData.cryptoCurrenciesList = action.payload;
			cryptoStore.emitChange();
			break;
		default:
			break;
	}
});

export default cryptoStore;
