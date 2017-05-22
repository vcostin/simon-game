import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import SimonReducer from './reducers/SimonReducer';

const middleware = applyMiddleware(createLogger());
// export default createStore(SimonReducer, middleware);
export default createStore(SimonReducer);
