import './App.css';
import AuthProvider from '../src/context/AuthProvider';
import AppRoutes from './routes/AppRoutes';
import LanguageProvider from './context/LanguageProvider';

function App() {
	return (
		<AuthProvider>
			<LanguageProvider>
				<AppRoutes />
			</LanguageProvider>
		</AuthProvider>
	);
}
export default App;
