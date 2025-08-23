import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import CreatePoll from './components/poll/create-poll.tsx';
import './index.css';
import Poll from './components/poll/poll.tsx';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/poll' element={<CreatePoll />} />
			<Route path='/poll/:id' element={<Poll />} />
		</Routes>
	</BrowserRouter>
);
