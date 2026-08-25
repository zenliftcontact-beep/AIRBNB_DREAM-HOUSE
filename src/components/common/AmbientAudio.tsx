"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Sliders } from "lucide-react";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundscape, setSoundscape] = useState<"ocean" | "fireplace" | "forest">("ocean");
  const [volume, setVolume] = useState(0.35);
  const [showControls, setShowControls] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<any[]>([]);

  const stopAllNodes = () => {
    nodesRef.current.forEach((n) => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch {
        // ignore
      }
    });
    nodesRef.current = [];
  };

  const createPinkNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  };

  const startSoundscape = (type: "ocean" | "fireplace" | "forest") => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      stopAllNodes();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (type === "ocean") {
        // Ocean surf: pink noise through modulated lowpass filter
        const noiseBuffer = createPinkNoiseBuffer(ctx);
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec ocean wave cycle

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(220, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        noiseSource.connect(filter);
        filter.connect(masterGain);

        noiseSource.start();
        lfo.start();
        nodesRef.current = [noiseSource, filter, lfo, lfoGain, masterGain];
      } else if (type === "fireplace") {
        // Crackling fireplace sound
        const noiseBuffer = createPinkNoiseBuffer(ctx);
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.setValueAtTime(650, ctx.currentTime);
        bandpass.Q.setValueAtTime(3.0, ctx.currentTime);

        noiseSource.connect(bandpass);
        bandpass.connect(masterGain);
        noiseSource.start();
        nodesRef.current = [noiseSource, bandpass, masterGain];
      } else if (type === "forest") {
        // High frequency gentle forest wind and chimes
        const noiseBuffer = createPinkNoiseBuffer(ctx);
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(432, ctx.currentTime); // 432 Hz soothing harmonic

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.04, ctx.currentTime);

        noiseSource.connect(filter);
        filter.connect(masterGain);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        noiseSource.start();
        osc.start();
        nodesRef.current = [noiseSource, filter, osc, oscGain, masterGain];
      }

      setIsPlaying(true);
    } catch (e) {
      console.warn("Audio Context initialization deferred:", e);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAllNodes();
      setIsPlaying(false);
    } else {
      startSoundscape(soundscape);
    }
  };

  const handleSoundscapeChange = (type: "ocean" | "fireplace" | "forest") => {
    setSoundscape(type);
    if (isPlaying) {
      startSoundscape(type);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopAllNodes();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border ${
            isPlaying
              ? "bg-gold-400/20 text-gold-300 border-gold-400/40 shadow-gold-subtle"
              : "bg-white/5 text-sand-300 border-white/10 hover:border-gold-400/30 hover:text-white"
          }`}
          title={isPlaying ? "Mute Ambient Soundscape" : "Play Luxury Ambient Soundscape"}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span className="hidden sm:inline">SANCTUARY AUDIO</span>
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-gold-400 animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 h-3 bg-gold-400 animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="w-0.5 h-1.5 bg-gold-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-sand-400" />
              <span className="hidden sm:inline">AMBIENT SOUND</span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowControls(!showControls)}
          className="p-1.5 rounded-full bg-white/5 border border-white/10 text-sand-400 hover:text-gold-300 transition-colors"
          title="Soundscape Settings"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>

      {showControls && (
        <div className="absolute right-0 top-full mt-3 w-64 p-4 rounded-2xl bg-charcoal-900/95 backdrop-blur-xl border border-gold-400/25 shadow-glass-elevated z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <span className="text-xs font-serif tracking-widest text-gold-300 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Sensory Ambiance
            </span>
            <button
              onClick={() => setShowControls(false)}
              className="text-xs text-sand-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-sand-400 block mb-1.5">
                Soundscape Environment
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(["ocean", "fireplace", "forest"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleSoundscapeChange(type)}
                    className={`py-1.5 px-2 rounded-lg text-xs capitalize transition-all ${
                      soundscape === type
                        ? "bg-gold-400/20 text-gold-300 border border-gold-400/40 font-medium"
                        : "bg-white/5 text-sand-300 hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] uppercase tracking-wider text-sand-400 mb-1">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-gold-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <p className="text-[10px] text-sand-500 leading-relaxed italic pt-1 border-t border-white/5">
              Gentle acoustic wave modulation modeled after the Pacific coastal sanctuary.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
