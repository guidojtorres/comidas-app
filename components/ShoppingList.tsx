"use client";

import { useState, useTransition, useEffect } from "react";
import { toggleItem, addItem, deleteItem, clearAllItems, initDb } from "@/app/actions/shopping";

interface ShoppingItem {
    id: number;
    name: string;
    category: string;
    is_completed: boolean;
}

export default function ShoppingList({ initialItems, dbReady }: { initialItems: ShoppingItem[], dbReady: boolean }) {
    const [items, setItems] = useState<ShoppingItem[]>(initialItems);
    const [isPending, startTransition] = useTransition();
    const [newItemName, setNewItemName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("proteinas");

    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const catNames: Record<string, string> = { 
        proteinas: "🥩 Proteínas", 
        lacteos: "🧀 Lácteos", 
        verduras: "🥬 Verduras y frutas", 
        secos: "🌾 Secos y harinas", 
        condimentos: "🫙 Condimentos" 
    };

    if (!dbReady) {
        return (
            <div className="flex flex-col items-center text-center p-8 bg-card border border-line rounded-2xl shadow-sm mt-4">
                <span className="text-4xl mb-4">🗄️</span>
                <h3 className="font-display font-extrabold text-xl mb-2">Base de Datos no encontrada</h3>
                <p className="text-muted text-sm mb-6">
                    Aún no se conectó la base de datos o falta inicializarla para soportar persistencia.
                </p>
                <form action={async () => {
                    await initDb();
                    window.location.reload();
                }}>
                    <button type="submit" className="bg-accent text-white font-extrabold px-6 py-2.5 rounded-xl hover:bg-accent2 transition-all">
                        Inicializar Base de Datos
                    </button>
                </form>
            </div>
        );
    }

    const handleToggle = async (item: ShoppingItem) => {
        // Optimistic UI Update
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_completed: !i.is_completed } : i));
        
        startTransition(() => {
            toggleItem(item.id, item.is_completed);
        });
    };

    const handleDelete = async (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
        startTransition(() => {
            deleteItem(id);
        });
    }

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName.trim()) return;
        
        // Optimistic addition (fake ID, wait for real refresh soon to fix)
        const fakeId = Date.now();
        setItems(prev => [...prev, { id: fakeId, name: newItemName, category: selectedCategory, is_completed: false }]);
        
        const tempName = newItemName;
        setNewItemName("");
        
        startTransition(() => {
            addItem(tempName, selectedCategory);
        });
    }

    const handleClearAll = async () => {
        setItems(prev => prev.map(i => ({ ...i, is_completed: false })));
        startTransition(() => {
            clearAllItems();
        });
    }

    // Grouping
    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, ShoppingItem[]>);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mt-2 mb-1 pl-1 pr-2">
                <div>
                    <h2 className="font-display text-2xl font-extrabold">🛒 Supermercado</h2>
                    <p className="text-[13px] text-muted">Sincronizado entre dispositivos</p>
                </div>
                <button 
                    onClick={handleClearAll}
                    disabled={isPending}
                    className="text-xs font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    Desmarcar todo
                </button>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2 p-3 my-4 bg-card border border-line rounded-2xl shadow-sm items-center">
                <select 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="bg-soft text-fg text-xs font-bold py-2 px-2 rounded-lg border-none focus:ring-0 outline-none w-28 appearance-none cursor-pointer text-center"
                >
                    {Object.keys(catNames).map(k => (
                        <option key={k} value={k}>{catNames[k].split(' ')[0]} {k}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    placeholder="Agregar un item..."
                    className="flex-1 bg-transparent text-sm min-w-0 outline-none text-fg placeholder-muted"
                />
                <button type="submit" disabled={!newItemName.trim() || isPending} className="text-white bg-accent disabled:opacity-50 rounded-lg p-2 flex items-center justify-center shrink-0">
                    <span className="font-extrabold leading-none text-lg">+</span>
                </button>
            </form>

            <div className="flex flex-col gap-3 pb-8">
                {Object.entries(catNames).map(([catKey, catName]) => {
                    const catItems = groupedItems[catKey] || [];
                    if (catItems.length === 0) return null;

                    // Sort items: uncompleted first, then completed. Then by ID.
                    const sortedItems = [...catItems].sort((a, b) => {
                        if (a.is_completed === b.is_completed) return a.id - b.id;
                        return a.is_completed ? 1 : -1;
                    });

                    return (
                        <div key={catKey} className="bg-card border border-line rounded-2xl p-4 shadow-sm relative overflow-hidden group">
                            {/* Visual effect for category background */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/5 to-transparent rounded-bl-full pointer-events-none" />
                            
                            <div className="font-extrabold text-sm mb-3 text-accent inline-flex items-center gap-2">
                                {catName}
                                <span className="bg-soft text-muted text-[10px] px-1.5 py-0.5 rounded-md">
                                    {catItems.filter(i => !i.is_completed).length} items
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                {sortedItems.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className={`flex items-center gap-3 py-2 px-1 rounded-lg group/item transition-all duration-200 cursor-pointer ${
                                            item.is_completed ? 'opacity-40 line-through text-muted bg-soft/50' : 'text-fg font-medium hover:bg-black/5 dark:hover:bg-white/5'
                                        }`}
                                    >
                                        <div 
                                            onClick={() => handleToggle(item)}
                                            className="flex-1 flex items-center gap-3 min-w-0"
                                        >
                                            <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                                                item.is_completed 
                                                    ? 'bg-accent border-accent text-white scale-90' 
                                                    : 'border-line hover:border-accent group-hover/item:border-accent group-active/item:scale-95'
                                            }`}>
                                                {item.is_completed && <span className="text-[10px] leading-none">✓</span>}
                                            </div>
                                            <span className="leading-snug truncate">{item.name}</span>
                                        </div>
                                        {/* Delete button (only visible on hover unless completed, optionally always visible) */}
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="opacity-0 group-hover/item:opacity-100 p-1 text-muted hover:text-red-500 transition-all shrink-0 focus:opacity-100"
                                            aria-label="Delete item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
