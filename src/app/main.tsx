import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <GoogleOAuthProvider clientId='319501402824-51h3rcq9hclpndmq00je0kad25ps614u.apps.googleusercontent.com'>
      < App/>
    </GoogleOAuthProvider>
);