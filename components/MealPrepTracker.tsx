"use client";

import { useState, useEffect } from "react";

interface MealPrepTrackerProps {
    prepText: string;
}

export default function MealPrepTracker({ prepText }: MealPrepTrackerProps) {
    const parts = prepText.split(':');
    const label = parts[0].trim();
    const tasksStr = parts.slice(1).join(':');
    const tasks = tasksStr.split('·').map(t => t.trim()).filter(Boolean);

    const getWeekKey = () => {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
        const weekNum = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);
        return `mealprep-${now.getFullYear()}-w${weekNum}`;
    };

    const [checked, setChecked] = useState<boolean[]>(tasks.map(() => false));
    const [mounted, setMounted] = useState(false);

    // Restore from localStorage after mount (avoids hydration mismatch)
    useEffect(() => {
        try {
            const saved = localStorage.getItem(getWeekKey());
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length === tasks.length) {
                    setChecked(parsed);
                }
            }
        } catch { /* noop */ }
        setMounted(true);
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem(getWeekKey(), JSON.stringify(checked));
        }
    }, [checked, mounted]);

    const completedCount = checked.filter(Boolean).length;
    const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

    const toggle = (index: number) => {
        setChecked(prev => prev.map((v, i) => (i === index ? !v : v)));
    };

    return (
        <div className="bg-accent2/10 border border-accent2/20 rounded-2xl p-4 mb-4 shadow-sm">
            {/* Header with label and counter */}
            <div className="flex items-center justify-between mb-3">
                <div className="font-extrabold text-sm text-accent2 flex items-center gap-2">
                    <span className="text-lg">📋</span> {label}
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg transition-colors ${
                    progress === 100
                        ? 'text-white bg-accent2 shadow-sm'
                        : 'text-accent2 bg-accent2/15'
                }`}>
                    {completedCount}/{tasks.length}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-soft rounded-full mb-3 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-accent2 to-accent rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Task checklist */}
            <div className="flex flex-col gap-0.5">
                {tasks.map((task, i) => (
                    <div
                        key={i}
                        onClick={() => toggle(i)}
                        className="flex items-center gap-3 py-2 px-1.5 rounded-lg cursor-pointer hover:bg-accent2/5 transition-all group"
                    >
                        <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                            checked[i]
                                ? 'bg-accent2 border-accent2 text-white scale-90'
                                : 'border-accent2/40 group-hover:border-accent2'
                        }`}>
                            {checked[i] && <span className="text-[10px] leading-none">✓</span>}
                        </div>
                        <span className={`text-[13px] leading-relaxed transition-all ${
                            checked[i] ? 'line-through opacity-50 text-muted' : 'text-fg font-medium'
                        }`}>
                            {task}
                        </span>
                    </div>
                ))}
            </div>

            {/* Completion celebration */}
            {progress === 100 && (
                <div className="mt-3 text-center text-sm font-extrabold text-accent2 animate-bounce">
                    🎉 ¡Meal prep completo!
                </div>
            )}
        </div>
    );
}
