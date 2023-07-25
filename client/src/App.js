import './App.css'
import AppRoutes from './routes/AppRoutes'
import AuthProvider from '../src/context/AuthProvider'
import LanguageProvider from './context/LanguageProvider'

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
