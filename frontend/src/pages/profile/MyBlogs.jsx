    import React from 'react';
    import { useNavigate } from 'react-router'; 
    import { Plus, Settings, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
    import { useUserBlogs } from '../../hooks/blog/useUserBlogs';

    const MyBlogs = () => {
    const { myBlogs, deleteBlog } = useUserBlogs();
    const navigate = useNavigate(); 

    const borderColors = [
        "border-[var(--primary-color)]",
        "border-[var(--secondary-color)]",
        "border-[var(--accent-color)]",
        "border-[var(--success-color)]",
        "border-[var(--category-color)]"
    ];

    return (
        <div className="w-full min-h-screen bg-[var(--bg-color)] px-4 sm:px-8 md:px-12 py-12 font-custom-main text-black">
        
        {/* En-tête du Tableau de bord */}
        <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-6 pb-6 mb-16 mt-12 md:mt-16">
            
            {/* BOUTON GAUCHE : Retour à l'accueil / profil */}
            <div className="w-full md:w-48 flex justify-center md:justify-start order-2 md:order-1 max-w-xs mx-auto md:max-w-none md:mb-1">
            <button 
                onClick={() => navigate('/')} // Redirige vers la home ou /profile
                className="flex items-center gap-2 bg-neutral-800 hover:bg-black text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 ease-in-out cursor-pointer w-full md:w-auto justify-center"
            >
                <ArrowLeft size={16} />
                <span>Retour au profil</span>
            </button>
            </div>

            {/* TITRE AU MILIEU */}
            <div className="text-center flex-1 order-1 md:order-2 mt-6 md:mt-0">
            <h1 className="font-custom-title font-black text-4xl sm:text-5xl text-black tracking-tight mb-2">
                Mes blogs
            </h1>
            <p className="text-neutral-400 text-sm font-medium">
                Gère tes espaces, écris de nouveaux articles.
            </p>
            </div>
            
            {/* BOUTON DROITE : Créer un nouvel espace */}
            <div className="w-full md:w-48 flex justify-center md:justify-end order-3 max-w-xs mx-auto md:max-w-none md:mb-1">
            <button 
                onClick={() => navigate('/create/blog')} // Redirige vers le formulaire de création
                className="flex items-center gap-2 bg-[#7B96EC] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-300 ease-in-out cursor-pointer w-full md:w-auto justify-center"
            >
                <Plus size={18} />
                <span>Créer un nouveau blog</span>
            </button>
            </div>

        </header>

        {/* Grille des Blogs */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-cols-2 md:gap-8">
            
            {myBlogs.map((blog, index) => {
            const currentBorder = borderColors[index % borderColors.length];
            const blogCover = blog.cover || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600";
            const blogCategory = blog.category || `Thème ${blog.theme_id}`;
            const blogStatus = blog.status || "Publié";
            const articlesCount = blog.articlesCount || 0;

            return (
                <div 
                key={blog.id} 
                className={`group bg-white rounded-[2rem] border-[3px] ${currentBorder} shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300`}
                >
                {/* Image de couverture */}
                <div className="relative w-full h-36 md:h-48 overflow-hidden">
                    <img 
                    src={blogCover} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-black">
                    {blogCategory}
                    </div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white ${blogStatus === 'Publié' ? 'bg-green-400' : 'bg-orange-300'}`}>
                    {blogStatus}
                    </div>
                </div>

                {/* Contenu textuel */}
                <div className="p-5 md:p-6">
                    <h3 className="font-custom-title font-black text-xl md:text-2xl text-black mb-1">
                    {blog.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium mb-3 md:mb-4">
                    Créé le {new Date(blog.creation_date).toLocaleDateString('fr-FR')}
                    </p>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-500 bg-neutral-50 rounded-xl px-4 py-2 w-fit">
                    <span className="font-bold text-black">{articlesCount}</span> articles publiés
                    </div>
                </div>

                {/* Barre d'actions du bas */}
                <div className="flex items-center justify-between px-5 md:px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                    <div className="flex items-center gap-3">
                    <button className="text-neutral-400 hover:text-black transition cursor-pointer">
                        <Settings size={18} />
                    </button>
                    <button 
                        onClick={() => deleteBlog(blog.id)}
                        className="text-neutral-400 hover:text-red-500 transition cursor-pointer"
                    >
                        <Trash2 size={18} />
                    </button>
                    </div>

                    {/* Accès à l'espace de gestion de CE blog */}
                    <button 
                    onClick={() => navigate('/create/mon-blog')}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#7B96EC] hover:text-black transition cursor-pointer"
                    >
                    <span>Gérer</span>
                    <ArrowRight size={16} />
                    </button>
                </div>
                </div>
            );
            })}

            {/* Carte Création (Lien du bas) */}
            <button 
            onClick={() => navigate('/create/blog')} // Corrigé ici aussi
            className="bg-transparent border-[3px] border-dashed border-neutral-300 hover:border-black rounded-[2rem] flex flex-col items-center justify-center p-6 md:p-8 min-h-[280px] md:min-h-[350px] text-neutral-400 hover:text-black transition-all duration-300 cursor-pointer group"
            >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-neutral-100 group-hover:bg-black group-hover:text-white rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                <Plus size={24} />
            </div>
            <span className="font-bold text-base md:text-lg">Créer un nouveau blog</span>
            <span className="text-xs md:text-sm font-medium mt-2">Commencez une nouvelle histoire</span>
            </button>

        </div>
        </div>
    );
    };

    export default MyBlogs;