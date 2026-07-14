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
											to="https://bags.RobinFrog.fun/"
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
							href={`https://game.RobinFrog.fun`}
							className="bg-black text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/game.png" alt="Game" className="w-8" />
						</a> */}
						<a
							href="https://x.com/RobinFrog_"
							target="_blank"
							className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/x.png" alt="Gifme Banner" className="w-6" />
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
