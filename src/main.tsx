import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import CreatePoll from './components/poll/create-poll.tsx';
import Poll from './components/poll/poll.tsx';
import './index.css';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById('root')!).render(
	<ConvexProvider client={convex}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/poll' element={<CreatePoll />} />
				<Route path='/poll/:id' element={<Poll />} />
			</Routes>
		</BrowserRouter>
	</ConvexProvider>
);
