import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
// import './App.css';
import 'tailwindcss/tailwind.css';
import Iot from './routes/Iot';
import LinkBar from './components/LinkBar';

const Hello = () => {
  return (
    <div className="h-screen">
      <div>
        <Link to="/iot">Iot</Link>
      </div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1 className="">electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600">
        <Router>
          <LinkBar />
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/iot" element={<Iot />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
