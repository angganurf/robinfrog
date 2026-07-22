import { Ban, Flame, Lock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
	const [copied, setCopied] = useState(false);
	const [hoveredImage, setHoveredImage] = useState<number | null>(null);
	const [showConfetti, setShowConfetti] = useState(false);

	// NEW: state untuk image viewer
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const contractAddress = "0xfd36A4Cbc4D5F39799bad0874ed6bA3D54D23970";

	const imageUrls = [
		"/new-assets/1.gif",
		"/new-assets/2.gif",
		"/new-assets/3.gif",
		"/new-assets/4.gif",
		"/new-assets/5.gif",
		"/new-assets/6.gif",
		"/new-assets/7.gif",
		"/new-assets/8.gif",
		"/new-assets/9.gif",
		"/new-assets/10.gif",
		
	];

	const playSound = () => {
		const audioContext = new (window.AudioContext ||
			(window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.frequency.value = 800;
		oscillator.type = "sine";
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.2,
		);
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.2);
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

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(contractAddress);
			setCopied(true);
			setShowConfetti(true);
			playSound();
			setTimeout(() => setCopied(false), 2000);
			setTimeout(() => setShowConfetti(false), 3000);
		} catch (err) {
			// Fallback untuk browser lama
			const textArea = document.createElement("textarea");
			textArea.value = contractAddress;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopied(true);
			setShowConfetti(true);
			playSound();
			setTimeout(() => setCopied(false), 2000);
			setTimeout(() => setShowConfetti(false), 3000);
		}
	};

	// === Image Viewer handlers ===
	const openViewer = (index: number) => {
		setCurrentIndex(index);
		setIsViewerOpen(true);
		// Kunci scroll halaman di belakang modal
		document.body.style.overflow = "hidden";
	};

	const closeViewer = () => {
		setIsViewerOpen(false);
		document.body.style.overflow = "";
	};

	const showPrev = () => {
		setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
	};

	const showNext = () => {
		setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
	};

	// Keyboard support: ← → untuk navigasi, Esc untuk close
	useEffect(() => {
		if (!isViewerOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") showPrev();
			else if (e.key === "ArrowRight") showNext();
			else if (e.key === "Escape") closeViewer();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isViewerOpen]);

	// Optional: preload gambar next/prev agar mulus
	useEffect(() => {
		if (!isViewerOpen) return;
		const nextImg = new Image();
		nextImg.src = imageUrls[(currentIndex + 1) % imageUrls.length];
		const prevImg = new Image();
		prevImg.src =
			imageUrls[(currentIndex - 1 + imageUrls.length) % imageUrls.length];
	}, [currentIndex, isViewerOpen]);

	const downloadCurrent = async () => {
		const url = imageUrls[currentIndex];
		// Untuk aset lokal yang sama origin, cukup pakai <a download>
		const link = document.createElement("a");
		link.href = url;
		const filename = url.split("/").pop() || `image-${currentIndex + 1}`;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			<div className="flex flex-col gap-10">
			{/* 1. Hero Section */}
			<div className="flex flex-col items-center gap-6">
				{/* Banner */}
				<div className="w-full border-4 border-black rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
					<img
						src="/new-assets/banner.jpeg"
						alt="ProgonPons Banner"
						className="w-full object-cover"
					/>
				</div>

				{/* Title and Description */}
				<div className="text-center space-y-4 px-2 sm:px-4 mt-2">
					<h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-widest uppercase">
						ProgonPons
					</h1>
					<p className="text-base sm:text-xl font-bold bg-white border-4 border-black p-4 sm:p-6 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-3xl mx-auto">
						The chaotic little blob with big dreams, bigger eyes, and endless curiosity. Here to bring fun, memes, and positive vibes to the community.
					</p>
				</div>

				{/* Contract address */}
				<div
					className="w-full max-w-4xl mt-6 cursor-pointer px-2"
					onClick={copyToClipboard}
					onMouseEnter={playHoverSound}
				>
					<div className="bg-white border-4 border-black rounded-2xl p-4 sm:p-5 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none transition-all">
						<code className="font-black text-sm sm:text-2xl break-all">
							CA: {copied ? "COPIED TO CLIPBOARD! 🎉" : contractAddress}
						</code>
					</div>
				</div>

				{/* CTA Buttons */}
				{/* <div className="flex justify-center w-full px-2 mt-4 mb-2">
					<a
						href="https://bags.fm/0x594F94d3A62373A810258f5d0938181a45f13efa"
						className="w-1/2 text-center bg-yellow-400 text-black border-4 border-black rounded-full px-4 py-3 sm:py-4 text-xl sm:text-2xl font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none transition-all"
						onMouseEnter={playHoverSound}
						target="_blank"
					>
						Buy $PROG
					</a>
				</div> */}
			</div>

			{/* 2. About Section */}
			<div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8 mt-6">
				<div className="w-full md:w-1/3 flex justify-center">
					<div className="border-4 border-black rounded-3xl overflow-hidden bg-[#85C905] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
						<img
							src="/new-assets/1.gif"
							alt="ProgonPons Profile"
							className="w-full max-w-[280px] aspect-square object-cover"
						/>
					</div>
				</div>
				<div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
					<h2 className="text-4xl sm:text-6xl font-black uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)] tracking-wide">
						Who is ProgonPons?
					</h2>
					<div className="space-y-4 text-lg sm:text-xl font-bold leading-relaxed">
						<p>
							ProgonPons isn't just another frog on the pond. This chaotic little blob is here to revolutionize the meme economy! With big dreams and even bigger eyes, ProgonPons brings endless curiosity to the blockchain.
						</p>
						<p className="bg-yellow-200 inline-block px-2 transform -rotate-1 border-2 border-black">
							Join the movement. Share the memes. Spread the positive vibes. We're all gonna make it (ribbit)!
						</p>
					</div>
				</div>
			</div>

			{/* 3. Tokenomics Section */}
			<div className="mt-8">
				<h2 className="text-5xl sm:text-7xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center mb-8 uppercase tracking-wider">
					Progonomics
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
					<div className="bg-[#5F9632] border-4 border-black rounded-3xl p-8 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
						<div className="mb-6 flex justify-center drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"><Ban size={72} strokeWidth={2.5} color="white" /></div>
						<h3 className="text-4xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wide">0% TAX</h3>
						<p className="font-bold text-xl text-black bg-white rounded-xl py-2 px-4 mt-4 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
							No bullshit.
						</p>
					</div>
					<div className="bg-[#5F9632] border-4 border-black rounded-3xl p-8 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
						<div className="mb-6 flex justify-center drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"><Flame size={72} strokeWidth={2.5} color="white" /></div>
						<h3 className="text-4xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wide">LP BURNED</h3>
						<p className="font-bold text-xl text-black bg-white rounded-xl py-2 px-4 mt-4 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
							Safe & Secure.
						</p>
					</div>
					<div className="bg-[#5F9632] border-4 border-black rounded-3xl p-8 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
						<div className="mb-6 flex justify-center drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"><Lock size={72} strokeWidth={2.5} color="white" /></div>
						<h3 className="text-4xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wide">REVOKED</h3>
						<p className="font-bold text-xl text-black bg-white rounded-xl py-2 px-4 mt-4 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
							Mint & Freeze.
						</p>
					</div>
				</div>
			</div>

			{/* 4. Image gallery */}
			<div className="mt-8">
				<h2 className="text-5xl sm:text-7xl font-black text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center mb-8 uppercase tracking-wider">
					Progon's Stash
				</h2>
				<div className="bg-[#5F9632] border-4 border-black rounded-3xl p-4 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
					<div className="flex flex-wrap justify-center gap-2 sm:gap-3">
					{imageUrls.map((url, index) => (
						<button
							key={index}
							type="button"
							className="relative overflow-hidden rounded-xl border-3 border-black bg-white group cursor-pointer w-[calc((100%-1rem)/3)] sm:w-[calc((100%-3rem)/5)] lg:w-[calc((100%-4.5rem)/7)] aspect-square flex-shrink-0"
							onMouseEnter={() => {
								setHoveredImage(index);
								playHoverSound();
							}}
							onMouseLeave={() => setHoveredImage(null)}
							onClick={() => openViewer(index)}
							aria-label={`Open image ${index + 1}`}
						>
							<img
								src={url}
								alt={`nuf sticker ${index + 1}`}
								className="gallery-image transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 w-full h-full object-cover"
								style={{
									filter:
										hoveredImage === index
											? "brightness(1.2) contrast(1.1)"
											: "none",
								}}
							/>
							{hoveredImage === index && (
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center p-2">
									<span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded animate-bounce">
										#{index + 1}
									</span>
								</div>
							)}
							<div
								className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
								style={{
									boxShadow:
										hoveredImage === index
											? "0 0 20px rgba(255, 255, 0, 0.6)"
											: "none",
								}}
							/>
						</button>
					))}
				</div>
			</div>
		</div>

		{/* 5. Footer */}
		<div className="mt-16 mb-8 text-center space-y-6">
				<div className="flex justify-center gap-4">
					<a
						href="https://x.com/ProgonPons"
						target="_blank"
						className="bg-black text-white border-4 border-black rounded-2xl p-4 hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
						onMouseEnter={playHoverSound}
					>
						<svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
					</a>
					<a
						href="https://pin.it/1WiTmyyxx"
						target="_blank"
						className="bg-[#E60023] text-white border-4 border-black rounded-2xl p-4 hover:bg-white hover:text-[#E60023] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
						onMouseEnter={playHoverSound}
					>
						<svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.13-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.48.75 1.48 1.65 0 1.01-.65 2.52-.98 3.92-.28 1.17.58 2.12 1.73 2.12 2.08 0 3.68-2.2 3.68-5.37 0-2.8-2.02-4.77-4.9-4.77-3.33 0-5.29 2.5-5.29 5.08 0 1.01.39 2.08.88 2.68.1.12.1.22.08.33-.1.38-.3.12-.34-.14-.4-.36-1.04-1.5-1.04-3.07 0-3.76 2.73-7.22 7.89-7.22 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.49 3.14C10.72 23.82 11.35 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
						</svg>
					</a>
				</div>
				<span className="text-black font-black text-2xl block uppercase tracking-wide">
					[ Stay tuned for more frogs...! ]
				</span>
				<p className="text-sm sm:text-base font-bold text-black/70 max-w-3xl mx-auto px-4 bg-white/30 p-4 rounded-xl border-2 border-black/20">
					$PROG is a meme coin with no intrinsic value or expectation of financial return. There is no formal team or roadmap. The coin is completely useless and for entertainment purposes only.
				</p>
			</div>
		</div>
			{/* Confetti Effect */}
			{showConfetti && (
				<div className="fixed inset-0 pointer-events-none z-50">
					{[...Array(10)].map((_, i) => (
						<div key={`confetti-${i}`} className="confetti" />
					))}
				</div>
			)}

			{/* === Image Viewer Modal === */}
			{isViewerOpen && (
				<div
					className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={(e) => {
						// klik background untuk close
						if (e.target === e.currentTarget) closeViewer();
					}}
					role="dialog"
					aria-modal="true"
				>
					<div className="relative w-full max-w-5xl">
						{/* Close button */}
						<button
							onClick={closeViewer}
							className="absolute -top-10 right-0 bg-white text-black px-3 py-1 rounded-full font-bold border-2 border-black shadow-lg hover:scale-105 active:scale-95"
							aria-label="Close viewer"
						>
							✕
						</button>

						{/* Image container */}
						<div className="relative bg-white border-4 border-black rounded-3xl overflow-hidden">
							{/* Prev */}
							<button
								onClick={showPrev}
								className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:scale-105 active:scale-95"
								aria-label="Previous image"
							>
								‹
							</button>

							{/* Next */}
							<button
								onClick={showNext}
								className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:scale-105 active:scale-95"
								aria-label="Next image"
							>
								›
							</button>

							{/* Big image */}
							<img
								src={imageUrls[currentIndex]}
								alt={`nuf sticker ${currentIndex + 1} large`}
								className="w-full max-h-[75vh] object-contain bg-white"
								draggable={false}
								onLoad={playHoverSound}
							/>

							{/* Footer controls */}
							<div className="flex items-center justify-between gap-2 p-3 border-t-4 border-black bg-[#f7f7f7]">
								<div className="font-bold">
									#{currentIndex + 1} / {imageUrls.length}
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={downloadCurrent}
										className="bg-black text-white px-4 py-2 rounded-full font-bold hover:scale-105 active:scale-95"
									>
										⬇️ Download
									</button>
								</div>
							</div>
						</div>

						{/* Tip keyboard */}
						<div className="mt-3 text-center text-white/80 text-sm">
							Tip: use ← → keys to navigate, Esc to close.
						</div>
					</div>
				</div>
			)}
		</>
	);
}
