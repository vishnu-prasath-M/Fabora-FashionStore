const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
