import DateTime from "./DateTime";

const Header = () => {
  return (
    <header className="flex bg-gray-800 text-white p-4 shadow-md border border-gray-700 rounded-lg shadow-2xl">
        <div className="flex-1">
        <h1 className="text-xl font-bold">Financial Dashboard <DateTime /></h1>
        </div>
        <div className="flex-1">
            <nav className="flex gap-x-4 justify-end">
            <a href="#">Dashboard</a>
            <a href="#">Orders</a>
            <a href="#">Research</a>
            <a href="#">Portfolio</a>
            </nav>
        </div>
    </header>
  );
};

export default Header;

