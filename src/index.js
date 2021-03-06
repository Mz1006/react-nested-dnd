import dva from 'dva';
import 'react-dom';
import 'babel-polyfill';
import './index.html';
import './index.less';


// 1. Initialize
export const app = dva({});

// 2. Plugins
// app.use(createLoading());

// 3. Model
// app.model();

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
