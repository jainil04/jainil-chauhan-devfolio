import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#resume.pdf', label: 'Resume' },
    { href: '/#contact', label: 'Contact' },
  ];
  return (
    <nav className="flex items-center p-4 bg-white dark:bg-gray-800">
      <ul className="flex flex-1 justify-evenly">
        {links.map(({ href, label }) => (
          <li className="list-none" key={href}>
            <Link
              href={href}
              className="no-underline text-blue-600 light:text-red
                dark:text-red
                hover:underline
                transition-colors duration-200"
              >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>

  );
}
