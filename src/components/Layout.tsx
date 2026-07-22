import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";


export default function Layout() {
	// === Background Music ===
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);


	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.1; // volume 50%
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((err) => {
					console.log(
						"Autoplay diblokir browser, menunggu user interaksi:",
						err,
					);
				});
			}
		}
	}, []);

	const toggleMusic = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const playHoverSound = () => {
		const audioContext = new (window.AudioContext ||
			(window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.frequency.value = 600;
		oscillator.type = "sine";
		gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.1,
		);
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	};

	const contractAddress = "9eKgXLJSPDLHWui5sbqKgvTbxh4FNusbc3Bho6ZrBAGS";

	return (
		<div className="min-h-screen bg-[#85C905] max-w-7xl mx-auto ">
			{/* Header */}
			<div className="px-2 sm:px-1">
				<header className="flex items-center justify-between py-2  px-4 sm:px-6 border-4 mt-2 sm:mb-[-10px] border-black rounded-3xl sm:mx-4  bg-white relative z-50">
					<div className="flex items-center gap-1 sm:gap-2">
						<Link to="/">
							<img
								src="/new-assets/logo.png"
								alt="nuf dog"
								className="w-12 sm:w-12"
							/>
						</Link>
						<Link to="/">
							<img
								src="/new-assets/name.gif"
								alt="Gifme Banner"
								className="w-20 sm:w-32 mt-2"
							/>
						</Link>
					</div>

					{/* Navigation */}
					<div className="flex items-center gap-2 sm:gap-4">
						{/* Dropdown Menu */}
						{/* <div
							className="relative"
							onMouseEnter={() => setIsMenuOpen(true)}
							onMouseLeave={() => setIsMenuOpen(false)}
						>
							<button
								className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
								onMouseEnter={playHoverSound}
							>
								Page ▾
							</button>
							{isMenuOpen && (
								<div className="absolute top-full right-0 pt-2 w-48 z-50">
									<div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
										<Link
											to="/gifmetune"
											className="px-4 py-3 hover:bg-[#85C905] hover:text-white font-bold border-b-4 border-black text-black transition-colors"
											onMouseEnter={playHoverSound}
										>
											GifMeTune
										</Link>
										<Link
											to="https://bags.ProgonPons.fun/"
											target="_blank"
											className="px-4 py-3 hover:bg-[#85C905] hover:text-white font-bold text-black transition-colors"
											onMouseEnter={playHoverSound}
										>
											GifMeBags
										</Link>
									</div>
								</div>
							)}
						</div> */}

						{/* <a
							target="_blank"
							href={`https://game.ProgonPons.fun`}
							className="bg-black text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/game.png" alt="Game" className="w-8" />
						</a> */}
						<a
							href="https://x.com/ProgonPons"
							target="_blank"
							className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/x.png" alt="Gifme Banner" className="w-6" />
						</a>
						<a
							href="https://pin.it/1WiTmyyxx"
							target="_blank"
							className="bg-[#E60023] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
							onMouseEnter={playHoverSound}
						>
							<svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.13-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.48.75 1.48 1.65 0 1.01-.65 2.52-.98 3.92-.28 1.17.58 2.12 1.73 2.12 2.08 0 3.68-2.2 3.68-5.37 0-2.8-2.02-4.77-4.9-4.77-3.33 0-5.29 2.5-5.29 5.08 0 1.01.39 2.08.88 2.68.1.12.1.22.08.33-.1.38-.3.12-.34-.14-.4-.36-1.04-1.5-1.04-3.07 0-3.76 2.73-7.22 7.89-7.22 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.49 3.14C10.72 23.82 11.35 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
							</svg>
						</a>
						{/* <a
							target="_blank"
							href={`https://dexscreener.com/solana/${contractAddress}`}
							className="bg-black text-white px-2 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/dex.png" alt="Gifme Banner" className="w-12" />
						</a> */}
					</div>

				</header>
			</div>


			{/* Main content */}
			<main className="px-2 sm:px-4 py-4 sm:py-8 max-w-7xl mx-auto">
				<Outlet context={{ playHoverSound }} />
			</main>

			{/* Background music player (hidden) */}
			<audio ref={audioRef} src="/assets/bgm.mp3" loop hidden />

			{/* Tombol Play/Pause di kanan bawah */}
			<button
				onClick={toggleMusic}
				className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95"
			>
				{isPlaying ? "⏸ Pause" : "▶️ Play"}
			</button>
		</div>
	);
}
