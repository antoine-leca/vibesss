    import React from "react";

    // Tes 6 importations d'images locales
    import imgSilhouette from "../assets/image/silhouette.jpg";
    import imgOcean from "../assets/image/ocean.jpg";
    import imgBureau from "../assets/image/bureau.jpg";
    import imgCarnet from "../assets/image/carnet.jpg";
    import imgOutfit from "../assets/image/outfit.jpg";
    import imgApero from "../assets/image/apero.jpg";

    const Home = () => {
    return (
        <main className="min-h-screen bg-brand-bg font-sans text-black flex flex-col items-center pt-24 md:pt-32 pb-16 px-4 overflow-hidden">
        
        {/* SECTION HERO */}
        <section className="text-center max-w-4xl mx-auto mb-10 md:mb-16 flex flex-col items-center mt-8 md:mt-0">
            <div className="mb-4 flex flex-col items-center gap-2">
            <p className="text-lg md:text-xl font-serif text-gray-800 tracking-[0.2em] uppercase mb-1">
                Bienvenue
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-black">
                Vibesss
            </h1>
            </div>
            
            <p className="text-lg md:text-2xl font-serif text-gray-700 italic tracking-wide mt-2 md:mt-4">
            La plateforme de création de blog
            </p>

            <h2 className="text-xl md:text-3xl font-sans font-light mt-10 md:mt-14 tracking-tight text-gray-950">
            Créer votre blog en 2 clics
            </h2>
        </section>

        {/* LA FLÈCHE ANIMÉE */}
        <div className="flex justify-center items-center mb-10 md:mb-6">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-7 h-7 text-gray-600 animate-bounce"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
        </div>

        {/* SECTION GALERIE */}
        <section className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-16 gap-4 md:gap-5 items-center md:items-end px-2 md:px-4 mb-4">
            
            {/* 1. Silhouette */}
            <div className="md:col-span-2 rounded-t-full rounded-b-2xl md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-[3/4] md:aspect-[2/3] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgSilhouette} alt="Silhouette" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* 2. Ocean  */}
            <div className="md:col-span-2 rounded-3xl md:rounded-[2.5rem] rotate-3 md:rotate-0 overflow-hidden shadow-xs aspect-square md:aspect-[3/4] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group mt-4 md:mt-0">
            <img src={imgOcean} alt="Ocean" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* 3. Bureau */}
            <div className="md:col-span-3 rounded-full md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-[4/5] md:aspect-[1/1] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgBureau} alt="Workspace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* ESPACE CENTRAL : Invisible sur mobile */}
            <div className="hidden md:block md:col-span-2"></div>

            {/* 4. Outfit */}
            <div className="md:col-span-2 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-square md:aspect-[3/4] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgOutfit} alt="Outfit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* 5. Carnet */}
            <div className="md:col-span-3 rounded-3xl md:rounded-[2.5rem] -rotate-2 md:rotate-0 overflow-hidden shadow-xs aspect-[3/4] md:aspect-[4/5] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group mt-6 md:mt-0">
            <img src={imgCarnet} alt="Notebook" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

            {/* 6. Apero */}
            <div className="md:col-span-2 rounded-full md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-square md:aspect-[2/3.5] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgApero} alt="Apero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>

        </section>

        </main>
    );
    };

    export default Home;