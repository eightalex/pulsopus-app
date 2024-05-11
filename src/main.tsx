import ReactDOM from 'react-dom/client';

import Root from '@/modules/Root';

const rootId = 'root';

ReactDOM
	.createRoot(document.getElementById(rootId)!)
	.render(<Root/>);
