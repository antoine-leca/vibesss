import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Tes 6 importations d'images locales
import imgSilhouette from "../assets/image/silhouette.jpg";
import imgOcean from "../assets/image/ocean.jpg";
import imgBureau from "../assets/image/bureau.jpg";
import imgCarnet from "../assets/image/carnet.jpg";
import imgOutfit from "../assets/image/outfit.jpg";
import imgApero from "../assets/image/apero.jpg";

const Home = () => {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if the intro has already played in this session
    return !sessionStorage.getItem("vibesss-intro-played");
  });

  const overlayRef = useRef(null);

  useEffect(() => {
    if (!showIntro) return;

    // Create a GSAP timeline for the intro and home page entrance
    const tl = gsap.timeline({
      onComplete: () => {
        setShowIntro(false);
        sessionStorage.setItem("vibesss-intro-played", "true");
      },
    });

    // 1. Set initial states to avoid flashes
    gsap.set(".intro-char", { y: "100%", opacity: 0 });
    gsap.set(".intro-sub", { y: 20, opacity: 0 });
    gsap.set(".intro-line", { width: 0, opacity: 0 });
    gsap.set(".hero-animate", { y: 40, opacity: 0 });
    gsap.set(".gallery-item-animate", { y: 60, opacity: 0, rotation: 1 });

    // 2. Letters slide up and fade in
    tl.to(".intro-char", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.7)",
    });

    // 3. Glowing line expands
    tl.to(".intro-line", {
      width: "180px",
      opacity: 1,
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.4");

    // 4. Subtitle fades and slides up
    tl.to(".intro-sub", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.5");

    // 5. Brief pause before transitioning out
    tl.to({}, { duration: 0.4 });

    // 6. Slide out the dark loader screen
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
    });

    // 7. Staggered reveal of home hero section elements
    tl.to(".hero-animate", {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.8"); // Overlaps with the overlay slide-out

    // 8. Premium staggered fade/rotation reveal of the gallery images
    tl.to(".gallery-item-animate", {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    }, "-=0.8");

  }, [showIntro]);

  return (
    <>
      {/* INTRO ANIMATION OVERLAY */}
      {showIntro && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-[var(--bg-quatro)] flex flex-col items-center justify-center z-[9999]"
        >
          <div className="flex flex-col items-center select-none">
            {/* Title container with overflow-hidden for slide-up reveal */}
            <div className="flex overflow-hidden py-1 mb-2">
              {"Vibesss".split("").map((char, index) => (
                <span
                  key={index}
                  className="intro-char inline-block text-6xl md:text-8xl font-serif font-bold text-neutral-950 tracking-tight"
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Glowing neon divider line */}
            <div className="intro-line h-[2px] bg-gradient-to-r from-transparent via-neutral-950 to-transparent mt-2 mb-4" />

            {/* Subtitle */}
            <p className="intro-sub text-neutral-700 font-serif italic text-base md:text-lg tracking-wide">
              La plateforme de création de blog
            </p>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-brand-bg font-sans text-black flex flex-col items-center pt-24 md:pt-32 pb-16 px-4 overflow-hidden">
        
        {/* SECTION HERO */}
        <section className="text-center max-w-4xl mx-auto mb-10 md:mb-16 flex flex-col items-center mt-8 md:mt-0">
          <div className="mb-4 flex flex-col items-center gap-2">
            <p className="hero-animate text-lg md:text-xl font-serif text-gray-800 tracking-[0.2em] uppercase mb-1">
              Bienvenue
            </p>
            <h1 className="hero-animate text-5xl md:text-7xl font-serif font-bold tracking-tight text-black">
              Vibesss
            </h1>
          </div>
          
          <p className="hero-animate text-lg md:text-2xl font-serif text-gray-700 italic tracking-wide mt-2 md:mt-4">
            La plateforme de création de blog
          </p>

          <h2 className="hero-animate text-xl md:text-3xl font-sans font-light mt-10 md:mt-14 tracking-tight text-gray-950">
            Créer votre blog en 2 clics
          </h2>
        </section>

        {/* LA FLÈCHE ANIMÉE */}
        <div className="hero-animate flex justify-center items-center mb-10 md:mb-6">
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
          <div className="gallery-item-animate md:col-span-2 rounded-t-full rounded-b-2xl md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-[3/4] md:aspect-[2/3] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgSilhouette} alt="Silhouette" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

          {/* 2. Ocean  */}
          <div className="gallery-item-animate md:col-span-2 rounded-3xl md:rounded-[2.5rem] rotate-3 md:rotate-0 overflow-hidden shadow-xs aspect-square md:aspect-[3/4] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group mt-4 md:mt-0">
            <img src={imgOcean} alt="Ocean" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

          {/* 3. Bureau */}
          <div className="gallery-item-animate md:col-span-3 rounded-full md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-[4/5] md:aspect-[1/1] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgBureau} alt="Workspace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

          {/* ESPACE CENTRAL : Invisible sur mobile */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* 4. Outfit */}
          <div className="gallery-item-animate md:col-span-2 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-square md:aspect-[3/4] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgOutfit} alt="Outfit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

          {/* 5. Carnet */}
          <div className="gallery-item-animate md:col-span-3 rounded-3xl md:rounded-[2.5rem] -rotate-2 md:rotate-0 overflow-hidden shadow-xs aspect-[3/4] md:aspect-[4/5] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group mt-6 md:mt-0">
            <img src={imgCarnet} alt="Notebook" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

          {/* 6. Apero */}
          <div className="gallery-item-animate md:col-span-2 rounded-full md:rounded-[2.5rem] overflow-hidden shadow-xs aspect-square md:aspect-[2/3.5] w-full transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] cursor-pointer group">
            <img src={imgApero} alt="Apero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

        </section>

      </main>
    </>
  );
};

export default Home;