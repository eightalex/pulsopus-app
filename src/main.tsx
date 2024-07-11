import ReactDOM from 'react-dom/client';
import Root from 'src/modules/root';

const rootId = 'root';

ReactDOM
	.createRoot(document.getElementById(rootId)!)
	.render(<Root/>);
