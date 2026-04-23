"use client";

import { useState } from "react";
import { RECIPE_CATEGORIES } from "../data/categories";
import ShoppingList from "./ShoppingList";

const mealLabels: Record<string, string> = { desayuno: "Desayuno", almuerzo: "Almuerzo", merienda: "Merienda", cena: "Cena" };
const mealIcons: Record<string, string> = { desayuno: "☀️", almuerzo: "🌤️", merienda: "🍵", cena: "🌙" };

export default function MealPlanApp({ days, recipes, shoppingItems, dbReady, tips }: any) {
    const [selectedDay, setSelectedDay] = useState(0);
    const [view, setView] = useState("plan");
    const [recipeFilter, setRecipeFilter] = useState("all");
    const [openRecipe, setOpenRecipe] = useState<string | null>(null);
    const day = days[selectedDay];

    const filteredRecipes = recipeFilter === "all" ? recipes : recipes.filter((r: any) => r.category === recipeFilter);

    return (
        <div className="font-sans min-h-screen bg-bg text-fg pb-8">
            {/* Header */}
            <div className="bg-gradient-to-br from-accent to-accent3 p-7 pb-5 text-white rounded-b-3xl">
                <div className="text-[13px] font-bold tracking-widest uppercase opacity-85 mb-1">
                    Plan semanal
                </div>
                <h1 className="font-display text-3xl font-extrabold leading-tight mb-2">
                    Comé rico, gastá poco 🍽️
                </h1>
                <p className="text-[13px] opacity-85">
                    Meal prep dominical + recetas rápidas entre semana
                </p>
            </div>

            {/* Tabs */}
            <div className="flex m-4 mt-4 bg-soft rounded-xl p-1 gap-1">
                {[["plan", "📅 Plan"], ["recetas", "👨‍🍳 Recetas"], ["compras", "🛒 Compras"], ["tips", "💡 Tips"]].map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => { setView(key); setOpenRecipe(null); }}
                        className={`flex-1 py-2.5 rounded-lg text-xs transition-all duration-150 ease-out ${
                            view === key 
                                ? "font-extrabold text-white bg-accent shadow-sm" 
                                : "font-semibold text-muted bg-transparent hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="px-4 pb-8">
                {/* ===== PLAN VIEW ===== */}
                {view === "plan" && (
                    <>
                        <div className="flex gap-2.5 overflow-x-auto pb-1 mb-4 mt-1 snap-x scrollbar-hide">
                            {days.map((d: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDay(i)}
                                    className={`snap-center shrink-0 min-w-[64px] px-2 py-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all duration-200 ease-out hover:-translate-y-[2px] ${
                                        selectedDay === i 
                                            ? "bg-accent text-white shadow-md" 
                                            : "bg-card text-fg border border-line hover:border-accent/30"
                                    }`}
                                >
                                    <span className="text-xl">{d.emoji}</span>
                                    <span className={`text-[11px] ${selectedDay === i ? "font-extrabold" : "font-semibold"}`}>
                                        {d.name.slice(0, 3)}
                                    </span>
                                    {d.tag && (
                                        <span className="text-[9px] font-bold uppercase opacity-80 tracking-widest mt-0.5">
                                            {d.tag}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="mb-3 pl-1">
                            <h2 className="font-display text-2xl font-extrabold text-fg flex items-center gap-2">
                                <span>{day.emoji}</span> {day.name}
                            </h2>
                            {day.tag && (
                                <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-widest text-accent">
                                    {day.tag}
                                </span>
                            )}
                        </div>

                        {day.prep && (
                            <div className="bg-accent2/10 border border-accent2/20 rounded-2xl p-3 mb-4 text-xs leading-relaxed text-fg shadow-sm">
                                <span className="font-extrabold text-accent2 mr-1">📋 </span>
                                {day.prep}
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            {Object.entries(day.meals).map(([key, meal]: [string, any]) => (
                                <div
                                    key={key}
                                    className="bg-card border border-line rounded-2xl p-4 transition-all duration-200 cursor-default hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{mealIcons[key]}</span>
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-muted">
                                                {mealLabels[key]}
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-bold text-accent bg-soft px-2 py-1 rounded-lg">
                                            ⏱ {meal.time}
                                        </span>
                                    </div>
                                    <div className="font-extrabold text-sm mb-1 text-fg">
                                        {meal.title}
                                    </div>
                                    <div className="text-[13px] text-muted leading-relaxed">
                                        {meal.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ===== RECETAS VIEW ===== */}
                {view === "recetas" && !openRecipe && (
                    <>
                        <h2 className="font-display text-2xl font-extrabold mt-2 mb-1 pl-1">
                            👨‍🍳 Recetas
                        </h2>
                        <p className="text-[13px] text-muted mb-4 pl-1">
                            Paso a paso de cada comida del plan
                        </p>

                        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 snap-x scrollbar-hide py-1">
                            {RECIPE_CATEGORIES.map(cat => (
                                <button
                                    key={cat.key}
                                    onClick={() => setRecipeFilter(cat.key)}
                                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all duration-150 ease-out hover:scale-105 ${
                                        recipeFilter === cat.key 
                                            ? "font-extrabold text-white bg-accent shadow-md" 
                                            : "font-semibold text-fg bg-card border border-line hover:border-accent/40"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2.5">
                            {filteredRecipes.map((recipe: any) => (
                                <div
                                    key={recipe.id}
                                    onClick={() => setOpenRecipe(recipe.id)}
                                    className="bg-card border border-line rounded-2xl p-3.5 flex items-center gap-3.5 transition-all duration-200 cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)]"
                                >
                                    <span className="text-3xl shrink-0">{recipe.emoji}</span>
                                    <div className="flex-1">
                                        <div className="font-extrabold text-sm text-fg mb-0.5 mt-0.5">
                                            {recipe.title}
                                        </div>
                                        <div className="flex gap-2.5 text-[11px] text-muted font-medium">
                                            <span>⏱ {recipe.time}</span>
                                            <span>🍽 {recipe.portions}</span>
                                        </div>
                                    </div>
                                    <span className="text-muted text-xl font-light opacity-50 pr-1">›</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ===== RECIPE DETAIL ===== */}
                {view === "recetas" && openRecipe && (() => {
                    const recipe = recipes.find((r: any) => r.id === openRecipe);
                    if (!recipe) return null;
                    return (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <button
                                onClick={() => setOpenRecipe(null)}
                                className="flex items-center gap-1.5 text-[13px] font-bold text-accent mb-3 mt-1 py-1 transition-all duration-150 ease-out hover:-translate-x-[2px]"
                            >
                                ← <span className="hover:underline">Volver a recetas</span>
                            </button>

                            <div className="bg-card border border-line rounded-[20px] p-5 mb-4 text-center shadow-sm">
                                <div className="text-5xl mb-3">{recipe.emoji}</div>
                                <h2 className="font-display text-2xl font-extrabold text-fg mb-2">{recipe.title}</h2>
                                <div className="flex justify-center gap-4 text-xs font-medium text-muted bg-soft inline-flex mx-auto px-4 py-1.5 rounded-xl">
                                    <span>⏱ {recipe.time}</span>
                                    <span>🍽 {recipe.portions}</span>
                                </div>
                            </div>

                            <div className="bg-card border border-line rounded-2xl p-4 mb-4 shadow-sm">
                                <div className="font-extrabold text-sm text-accent mb-3 flex items-center gap-2">
                                    <span className="text-lg">🧾</span> Ingredientes
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    {recipe.ingredients.map((ing: string, i: number) => (
                                        <div key={i} className={`flex items-center gap-3 py-2 text-[13px] text-fg ${i < recipe.ingredients.length - 1 ? 'border-b border-line' : ''}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
                                            <span className="font-medium leading-relaxed">{ing}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-card border border-line rounded-2xl p-4 shadow-sm">
                                <div className="font-extrabold text-sm text-accent2 mb-3 flex items-center gap-2">
                                    <span className="text-lg">📝</span> Preparación
                                </div>
                                <div className="flex flex-col gap-1">
                                    {recipe.steps.map((step: string, i: number) => (
                                        <div key={i} className={`flex items-start gap-3 py-2.5 ${i < recipe.steps.length - 1 ? 'border-b border-line' : ''}`}>
                                            <span className="bg-accent2 text-white min-w-[24px] h-[24px] rounded-[8px] flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 shadow-sm">
                                                {i + 1}
                                            </span>
                                            <span className="text-[13px] leading-relaxed text-fg font-medium">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {/* ===== COMPRAS VIEW ===== */}
                {view === "compras" && (
                    <ShoppingList initialItems={shoppingItems} dbReady={dbReady} />
                )}

                {/* ===== TIPS VIEW ===== */}
                {view === "tips" && (
                    <>
                        <h2 className="font-display text-2xl font-extrabold mt-2 mb-1 pl-1">
                            💡 Tips para ahorrar
                        </h2>
                        <p className="text-[13px] text-muted mb-4 pl-1">
                            Trucos para maximizar tu presupuesto
                        </p>

                        <div className="flex flex-col gap-2.5">
                            {tips.map((tip: string, i: number) => (
                                <div key={i} className="bg-card border border-line rounded-2xl p-4 flex gap-3.5 items-start shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md">
                                    <span className="bg-gradient-to-br from-accent to-accent3 text-white min-w-[26px] h-[26px] rounded-lg flex items-center justify-center text-[13px] font-extrabold shrink-0 mt-0.5 shadow-sm">
                                        {i + 1}
                                    </span>
                                    <span className="text-[13px] leading-relaxed text-fg font-medium">{tip}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 bg-gradient-to-br from-accent/15 to-accent3/10 border border-accent/20 rounded-2xl p-5 text-center shadow-inner">
                            <div className="text-3xl mb-2 drop-shadow-sm">💰</div>
                            <div className="font-extrabold text-sm mb-1.5 text-accent uppercase tracking-wider">
                                Ahorro estimado
                            </div>
                            <div className="text-[13px] text-fg font-medium leading-relaxed opacity-90 max-w-[250px] mx-auto">
                                Cocinando en casa vs delivery podés ahorrar entre un <span className="font-extrabold text-accent">50% y 70%</span> del gasto mensual en comida.
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
