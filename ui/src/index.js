import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// normalize for browser inconsistencies and include some global styles
import 'normalize.css/normalize.css';
import './styles/global.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
