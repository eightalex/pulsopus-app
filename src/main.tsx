import ReactDOM from 'react-dom/client';

import Root from '@/root';

const rootId = 'root';

ReactDOM
	.createRoot(document.getElementById(rootId)!)
	.render(<Root/>);
