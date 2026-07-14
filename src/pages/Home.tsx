import React, { useEffect, useRef, useState } from "react";

export default function Home() {
	const [copied, setCopied] = useState(false);
	const [hoveredImage, setHoveredImage] = useState<number | null>(null);
	const [showConfetti, setShowConfetti] = useState(false);

	// NEW: state untuk image viewer
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const contractAddress = "soon...";

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
			{/* Banner */}
			<div className="w-full mb-4 border-4 border-black rounded-3xl text-center cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group">
				<img
					src="/new-assets/banner.jpeg"
					alt="Gifme Banner"
					className="w-full rounded-3xl"
				/>
			</div>

			{/* Contract address */}
			<div className="relative mb-4">
				<div
					className="bg-white border-4 border-black rounded-3xl p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
					onClick={copyToClipboard}
					onMouseEnter={playHoverSound}
				>
					<div className="flex items-center justify-center gap-2 flex-wrap ">
						<code className="font-bold sm:text-2xl break-all">
							CA :{" "}
							{copied ? "Copied to clipboard! 🎉" : contractAddress + " 📋"}
						</code>
					</div>
				</div>
			</div>

			{/* Image gallery */}
			<div className="bg-[#5F9632] border-4 border-black rounded-3xl p-4 sm:p-8">
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
			<span className="text-[#5F9632] mt-6 block text-center">
				[ Stay tuned for more frogs...! ]
			</span>

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
