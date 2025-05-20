import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-black">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-bold text-xl tracking-tight">
                App with<span className="text-amber-600">Auth</span>
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-10 space-x-1 lg:space-x-2">
            <Link
              href="/login"
              className="px-3 hover:cursor-pointer py-2 w-fit h-fit bg-transparent hover:bg-blue-600 text-[#fcfcfd] rounded-lg text-md transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-3 hover:cursor-pointer py-2 w-fit h-fit bg-blue-600 text-[#fcfcfd] rounded-lg text-md transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
