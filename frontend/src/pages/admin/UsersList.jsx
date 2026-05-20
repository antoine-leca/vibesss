import React from "react";
import useUsers from "../../hooks/admin/useUsers";
import UserTable from "../../components/admin/Users/UserToken"; // Le fichier que tu as créé

const UsersList = () => {
    // On récupère tout ce dont on a besoin depuis ton hook personnalisé
    const { 
        users, 
        isLoading, 
        isRefreshing, 
        deleteUser, 
        refresh,
        currentPage,
        totalPages,
        nextPage,
        prevPage 
    } = useUsers(10); // 10 membres par page

    return (
        <div className="max-w-xl mx-auto space-y-6">
            {/* Header de la page */}
            <div className="flex justify-between items-end px-1">
                <div>
                    <h2 
                        className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]"
                        style={{ fontFamily: "var(--main-font)" }}
                    >
                        Administration
                    </h2>
                    <h1 
                        className="text-2xl font-black text-white uppercase tracking-tighter shadow-sm"
                        style={{ fontFamily: "var(--main-font)" }}
                    >
                        Membres
                    </h1>
                </div>

                <button 
                    onClick={refresh}
                    disabled={isRefreshing}
                    className="text-[10px] font-black uppercase text-white/30 hover:text-white transition-colors tracking-widest"
                    style={{ fontFamily: "var(--main-font)" }}
                >
                    {isRefreshing ? "Rafraîchissement..." : "Actualiser"}
                </button>
            </div>

            {/* Conteneur Glassmorphism */}
            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden p-2">
                <UserTable 
                    users={users}
                    isLoading={isLoading}
                    isRefreshing={isRefreshing}
                    onDelete={deleteUser}
                    pagination={{
                        currentPage,
                        totalPages,
                        nextPage,
                        prevPage
                    }}
                />
            </div>
        </div>
    );
};

export default UsersList;