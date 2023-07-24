import '../../App.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginHeader from '../../components/LoginHeader/LoginHeader';

function LoginPage() {
	return (
		<div className='login-page'>
			<LoginHeader />
			<div className='login-body'>
				<div className="login-body-left">
					<h1>miNotes</h1>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}

export default LoginPage;