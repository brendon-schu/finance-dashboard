const Panel = ({ title, children }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default Panel;
