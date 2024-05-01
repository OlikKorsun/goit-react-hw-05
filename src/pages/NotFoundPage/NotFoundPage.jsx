import { PiCatDuotone } from "react-icons/pi";
import {Link} from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
    return (<p>Page not found. Well done! Do not worry.
        Your gift is this funny cat
        <Link to="/"><PiCatDuotone className={css.icon} /> </Link>
        If you want return home - click on cat.</p>)
}