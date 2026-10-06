import { HashLink } from 'react-router-hash-link';

interface Props {
  label: string;
  href: string;
}

export const NavItem = ({ label, href }: Props) => {
  return (
    <li>
      <HashLink 
        to={href}
        className="hover:text-primary transition-colors duration-300 block py-2 xl:py-0"
      >
        {label}
      </HashLink>
    </li>
  );
};
