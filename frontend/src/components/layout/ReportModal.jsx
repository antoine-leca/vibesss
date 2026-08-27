import { useState } from "react";

const ReportModal = ({ isOpen, onClose, targetType, targetId, userId }) => {
    const [reason, setReason] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reasons = [
        "Spam",
        "Harcèlement",
        "Contenu inapproprié",
        "Droits d'auteur",
        "Autre"
    ];

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason) return alert("Veuillez choisir une raison");

        setIsSubmitting(true);
        try {
            const reportData = {
                report_reason: reason,
                description,
                user_id: userId,
                [targetType === "article" ? "article_id" :
                    targetType === "blog" ? "blog_id" : "comment_id"]: targetId
            };

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportData),
            });
            if (response.ok) {
                alert("Merci, votre signalement a été transmis aux administrateurs.");
                // Réinitialisation des champs pour le prochain usage
                setReason("");
                setDescription("");
                onClose();
            } else {
                alert("Une erreur est survenue lors de l'envoi du signalement.");
            }
        } catch (err) {
            console.error("Erreur réseau:", err);
            alert("Impossible de contacter le serveur.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-2xl text-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-red-400 text-2xl"></span> Signaler le contenu
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">
                            Raison du signalement
                        </label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 ring-purple-500/50 text-white transition-all appearance-none cursor-pointer"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        >
                            <option value="" className="bg-slate-800 text-white">Sélectionnez une raison...</option>
                            {reasons.map((r) => (
                                <option key={r} value={r} className="bg-slate-800 text-white">
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">
                            Précisions additionnelles
                        </label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:ring-2 ring-purple-500/50 h-32 resize-none placeholder:text-white/20 transition-all"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Décrivez brièvement le problème..."
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] px-4 py-3 bg-red-600/80 hover:bg-red-500 rounded-xl font-bold shadow-lg shadow-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Envoi en cours..." : "Confirmer le signalement"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;