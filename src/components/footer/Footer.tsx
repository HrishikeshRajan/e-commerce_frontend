import { SiGmail, SiLinkedin } from 'react-icons/si';
import { FaGithubSquare } from 'react-icons/fa';
import { Separator } from '../ui/separator';

function Footer() {
  return (
    <footer className="h-fit  w-full bg-slate-900 p-5">
      <div className="xl:6/12  flex flex-col justify-start gap-y-10 p-5 text-white xl:flex-row xl:gap-10">
        <span>
          <h4>Developer Contacts</h4>

          <ul className="flex flex-col gap-2 pt-5">
            <li>
              <a
                className="flex items-center gap-2 text-xs"
                href="www.linkedin.com/in/hrishikesh-rajan-96aa70165"
              >
                <SiLinkedin className="text-blue-500" />
                {' '}
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2 text-xs">
              <SiGmail className="text-red-500 " />
              {' '}
              hrishikeshrajan3@gmail.com
            </li>
            <li className="flex items-center gap-2 text-xs">
              <a
                className="flex items-center gap-2 text-xs"
                href="https://github.com/HrishikeshRajan"
              >
                <FaGithubSquare />
                {' '}
                Github
              </a>
            </li>
          </ul>
        </span>
      </div>
      <Separator className="my-4" />
      <div className="w-full text-center text-white">
        <a href="www.linkedin.com/in/hrishikesh-rajan-96aa70165">
          made with 💜 by Hrishikesh Rajan
        </a>
      </div>
    </footer>
  );
}

export default Footer;
