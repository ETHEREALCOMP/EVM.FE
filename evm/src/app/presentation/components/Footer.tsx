export default function Footer() {
    return (
      <footer className="bg-black footer text-white py-10 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} EVM. Всі права захищені.</p>
          <nav className="mt-2">
            <ul className="flex justify-center space-x-4">
              <li>
                <a href="/about" className="hover:underline">Про нас</a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">Політика конфіденційності</a>
              </li>
              <li>
                <a href="/contacts" className="hover:underline">Контакти</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }