const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* Movies World Text with Loader Effect */}
        <h2
          className="text-4xl sm:text-6xl font-bold tracking-wide text-gray-300"
          style={{
            background: `
              radial-gradient(154% 68.5% at top, transparent 79.5%, #AB8BFF 80%),
              radial-gradient(154% 68.5% at bottom, #AB8BFF 79.5%, transparent 80%),
              radial-gradient(154% 68.5% at top, transparent 79.5%, #AB8BFF 80%),
              #ccc
            `,
            backgroundSize: "50.5% 220%",
            backgroundPosition: "-100% 0%, 0% 0%, 100% 0%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "textLoaderAnimation 2s infinite linear",
          }}
        >
          MOVIES WORLD
        </h2>
      </div>
    </div>
  );
};

export default Loader;
