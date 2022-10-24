import { Link } from 'react-router-dom';

const LinkBar = () => {
  return (
    <>
      <div className="flex-auto">
        <div className=" flex flex-col  items-center h-full space-y-4">
          <ul className="text-white flex my-5 flex-row space-x-4">
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to="/iot">
                Iot
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LinkBar;
