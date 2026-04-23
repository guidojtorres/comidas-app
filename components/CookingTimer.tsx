"use client";

import { useState, useEffect, useRef } from "react";

interface CookingTimerProps {
    initialMinutes: number;
    label?: string;
    onClose: () => void;
}

export default function CookingTimer({ initialMinutes, label, onClose }: CookingTimerProps) {
    const totalSeconds = initialMinutes * 60;
    const [remaining, setRemaining] = useState(totalSeconds);
    const [isRunning, setIsRunning] = useState(true); // auto-start
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioRef = useRef<AudioContext | null>(null);

    // Reset when a new timer is started (different minutes/label)
    useEffect(() => {
        setRemaining(initialMinutes * 60);
        setIsRunning(true);
        setIsFinished(false);
    }, [initialMinutes, label]);

    // Countdown logic
    useEffect(() => {
        if (isRunning && remaining > 0) {
            intervalRef.current = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setIsFinished(true);
                        playAlarm();
                        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, remaining]);

    // Audio alarm via Web Audio API (no external assets needed)
    const playAlarm = () => {
        try {
            const ctx = new AudioContext();
            audioRef.current = ctx;
            const playBeep = (time: number, freq: number) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = "sine";
                gain.gain.setValueAtTime(0.3, ctx.currentTime + time);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.3);
                osc.start(ctx.currentTime + time);
                osc.stop(ctx.currentTime + time + 0.3);
            };
            playBeep(0, 880);
            playBeep(0.4, 988);
            playBeep(0.8, 1047);
        } catch { /* Web Audio not available */ }
    };

    const currentTotal = initialMinutes * 60;
    const progress = currentTotal > 0 ? ((currentTotal - remaining) / currentTotal) * 100 : 0;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    // SVG circular progress ring
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const handleReset = () => {
        setRemaining(currentTotal);
        setIsRunning(false);
        setIsFinished(false);
    };

    const handleClose = () => {
        if (audioRef.current) {
            try { audioRef.current.close(); } catch { /* noop */ }
        }
        onClose();
    };

    return (
        <div className={`fixed bottom-4 left-4 right-4 z-50 bg-card/95 backdrop-blur-xl border-2 ${
            isFinished
                ? 'border-accent3 shadow-[0_0_30px_rgba(196,85,58,0.3)]'
                : 'border-line shadow-2xl'
        } rounded-2xl p-4 transition-all duration-300`}>
            <div className="flex items-center gap-4">
                {/* Circular progress ring */}
                <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r={radius}
                            fill="none" stroke="currentColor"
                            className="text-soft" strokeWidth="5"
                        />
                        <circle
                            cx="50" cy="50" r={radius}
                            fill="none" stroke="currentColor"
                            className={isFinished ? "text-accent3" : "text-accent2"}
                            strokeWidth="5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 1s linear" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`font-extrabold text-lg tabular-nums ${
                            isFinished ? 'text-accent3 animate-pulse' : 'text-fg'
                        }`}>
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-0.5">
                        {isFinished ? '🔔 ¡Tiempo!' : '⏲️ Timer de cocina'}
                    </div>
                    {label && (
                        <div className="text-xs text-fg font-medium truncate mb-2">{label}</div>
                    )}
                    <div className="flex gap-2">
                        {!isFinished ? (
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                className="text-xs font-extrabold text-white bg-accent2 px-3 py-1.5 rounded-lg hover:bg-accent2/90 transition-all active:scale-95"
                            >
                                {isRunning ? '⏸ Pausar' : '▶ Seguir'}
                            </button>
                        ) : (
                            <button
                                onClick={handleReset}
                                className="text-xs font-extrabold text-white bg-accent2 px-3 py-1.5 rounded-lg hover:bg-accent2/90 transition-all active:scale-95"
                            >
                                🔄 Repetir
                            </button>
                        )}
                        <button
                            onClick={handleClose}
                            className="text-xs font-bold text-muted bg-soft px-3 py-1.5 rounded-lg hover:bg-line transition-all active:scale-95"
                        >
                            ✕ Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
