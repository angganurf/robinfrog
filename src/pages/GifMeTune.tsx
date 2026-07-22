import React, { useEffect, useState } from "react";
import {
	Copy,
	Terminal,
	ArrowRight,
	BookOpen,
	Github,
	Check,
	MessageSquare,
	Cpu,
	Sparkles,
	Zap,
	Brain,
	Clock,
	DollarSign,
	Target,
	Activity,
	Server,
	Twitter,
	Mail,
	ExternalLink,
} from "lucide-react";

const Pinterest = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
	>
		<path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.13-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.48.75 1.48 1.65 0 1.01-.65 2.52-.98 3.92-.28 1.17.58 2.12 1.73 2.12 2.08 0 3.68-2.2 3.68-5.37 0-2.8-2.02-4.77-4.9-4.77-3.33 0-5.29 2.5-5.29 5.08 0 1.01.39 2.08.88 2.68.1.12.1.22.08.33-.1.38-.3.12-.34-.14-.4-.36-1.04-1.5-1.04-3.07 0-3.76 2.73-7.22 7.89-7.22 4.14 0 7.36 2.95 7.36 6.9 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.35-1.49 3.14C10.72 23.82 11.35 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
	</svg>
);

export default function GifMeTune() {
	const [typedCommand, setTypedCommand] = useState("");
	const [visibleLines, setVisibleLines] = useState(0);
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		const textToCopy = "/plugin marketplace add gifmetune/main";
		navigator.clipboard.writeText(textToCopy).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		});
	};

	useEffect(() => {
		const fullCommand = '/ctx:plan "Add meme authentication"';
		let isMounted = true;

		const runAnimation = async () => {
			while (isMounted) {
				// Reset
				setTypedCommand("");
				setVisibleLines(0);
				await new Promise((r) => setTimeout(r, 1000));

				// Type Command
				for (let i = 1; i <= fullCommand.length; i++) {
					if (!isMounted) return;
					setTypedCommand(fullCommand.slice(0, i));
					await new Promise((r) => setTimeout(r, 50));
				}

				await new Promise((r) => setTimeout(r, 500));

				// Show Lines
				for (let i = 1; i <= 4; i++) {
					if (!isMounted) return;
					setVisibleLines(i);
					await new Promise((r) => setTimeout(r, 400));
				}

				// Wait before restart
				await new Promise((r) => setTimeout(r, 4000));
			}
		};

		runAnimation();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center py-10 px-4 space-y-20">
			{/* HERO SECTION */}
			<div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				{/* Left Column: Text Content */}
				<div className="flex flex-col text-left gap-6">
					<div>
						<span className="inline-block bg-[#1a1a1a] text-[#d4af37] border-2 border-[#d4af37] px-4 py-1 rounded-full text-sm font-bold mb-6">
							✨ Claude Plugin
						</span>
						<h1 className="text-5xl sm:text-7xl font-black uppercase leading-tight mb-4 ">
							Optimize <br />
							context flow, <br />
							<span className="text-[#FFD700] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
								Not prompt chaos.
							</span>
						</h1>
						<p className="text-xl text-[#1a1a1a] font-medium leading-relaxed max-w-xl">
							Precision-tuned context engineering for your Meme flow. Natural
							language to beat mapping, modular mix plans, and parallel groove
							execution.
						</p>
					</div>

					{/* Stats */}
					{/* <div className="grid grid-cols-3 gap-4 border-t-4 border-black pt-6 mt-2 text-center">
						<div>
							<div className="text-3xl font-black">📉 81%</div>
							<div className="text-sm font-bold text-gray-600">
								Cost Reduction
							</div>
						</div>
						<div>
							<div className="text-3xl font-black">⚡ 3x</div>
							<div className="text-sm font-bold text-gray-600">Speedup</div>
						</div>
						<div>
							<div className="text-3xl font-black">🎯 95%</div>
							<div className="text-sm font-bold text-gray-600">
								Token Reduction
							</div>
						</div>
					</div> */}

					{/* Buttons */}
					<div className="flex flex-wrap gap-4 mt-1">
						<button className="bg-[#FFD700] text-black border-4 border-black px-6 py-3 rounded-full font-black hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
							View on Github <ArrowRight size={20} strokeWidth={3} />
						</button>
						<button className="bg-white text-black border-4 border-black px-6 py-3 rounded-full font-black hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
							<BookOpen size={20} strokeWidth={3} /> Documentation
						</button>
					</div>
				</div>

				{/* Right Column: Terminal Mockup */}
				<div className="relative">
					{/* Terminal Card */}
					<div className="bg-[#1a1a1a] border-4 border-black rounded-3xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-white font-mono text-sm sm:text-base relative overflow-hidden min-h-[400px]">
						{/* Terminal Header */}
						<div className="flex gap-2 mb-6 opacity-80">
							<div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
							<div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
							<div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
						</div>

						{/* Content */}
						<div className="flex flex-col gap-4 mb-8">
							<div className="opacity-50 text-xs uppercase tracking-widest border-b border-white/20 pb-2 mb-2">
								Terminal
							</div>
							<div className="h-6">
								<span className="text-gray-400">$ </span>
								<span className="text-yellow-400">
									{typedCommand}
									<span className="animate-pulse">_</span>
								</span>
							</div>
							<div className="flex flex-col gap-2 text-gray-300 min-h-[120px]">
								{visibleLines >= 1 && (
									<div className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="text-[#85C905]">✓</span> Smart detection:
										Planning workflow
									</div>
								)}
								{visibleLines >= 2 && (
									<div className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="text-[#85C905]">✓</span> Spawning parallel
										frog agents...
									</div>
								)}
								{visibleLines >= 3 && (
									<div className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="text-[#85C905]">✓</span> 5 tasks created in
										2 minutes
									</div>
								)}
								{visibleLines >= 4 && (
									<div className="flex gap-2 items-center text-[#85C905] font-bold animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="">✓</span> 81% Cost Savings
									</div>
								)}
							</div>
						</div>

						{/* Input Box Mock */}
						<div className="bg-black/50 border-2 border-white/20 rounded-xl p-4 flex items-center justify-between gap-4 mt-auto">
							<code className="text-xs sm:text-sm text-gray-400 break-all">
								/plugin marketplace add gifmetune/main
							</code>
							<button
								onClick={handleCopy}
								className="bg-[#333] hover:bg-[#444] text-white p-2 rounded-lg transition-colors active:scale-95"
								title="Copy to clipboard"
							>
								{isCopied ? (
									<Check size={16} className="text-[#85C905]" />
								) : (
									<Copy size={16} />
								)}
							</button>
						</div>

						{/* Glow Effect */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-[#85C905] opacity-5 blur-[100px] pointer-events-none"></div>
					</div>
				</div>
			</div>

			{/* HOW IT WORKS SECTION */}
			<div className=" w-full flex flex-col items-center text-center bg-[#5F9632] border-4 border-black rounded-3xl p-4 sm:p-8">
				<span className="inline-block bg-[#1a1a1a] text-[#d4af37] border-2 border-[#d4af37] px-4 py-1 rounded-full text-sm font-bold mb-6">
					How It Works
				</span>
				<h2 className="text-4xl sm:text-5xl font-black uppercase mb-4 text-white">
					Optimize <span className="text-[#FFD700]">context</span> flow
				</h2>
				<p className="text-white font-medium max-w-2xl mb-16">
					Promptune provides a comprehensive context engineering framework to
					ensure your agents stay on beat.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative">
					{/* Step 1 */}
					<div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col text-left group hover:-translate-y-1 transition-transform duration-300 relative">
						<div className="flex justify-between items-start mb-6">
							<div className="w-12 h-12 bg-black text-[#d4af37] rounded-xl flex items-center justify-center border-2 border-[#d4af37]">
								<MessageSquare size={24} />
							</div>
							<div className="text-6xl font-black text-gray-100 select-none">
								01
							</div>
						</div>
						<h3 className="text-xl font-black uppercase mb-2">User Prompt</h3>
						<p className="text-gray-600 text-sm font-medium">
							Just type your intent naturally. No need to memorize complex CLI
							commands or syntax.
						</p>
						{/* Arrow: Down on Mobile, Right on Tablet/Desktop */}
						<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 md:top-1/2 md:-right-9 md:left-auto md:bottom-auto md:translate-x-0 z-10 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
							<ArrowRight size={32} strokeWidth={4} />
						</div>
					</div>

					{/* Step 2 */}
					<div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col text-left group hover:-translate-y-1 transition-transform duration-300 relative">
						<div className="flex justify-between items-start mb-6">
							<div className="w-12 h-12 bg-black text-[#d4af37] rounded-xl flex items-center justify-center border-2 border-[#d4af37]">
								<Cpu size={24} />
							</div>
							<div className="text-6xl font-black text-gray-100 select-none">
								02
							</div>
						</div>
						<h3 className="text-xl font-black uppercase mb-2">
							3-Tier Detection
						</h3>
						<p className="text-gray-600 text-sm font-medium">
							Cascade analysis: Keyword → Model2Vec → Semantic intent detection
							for maximum accuracy.
						</p>
						{/* Arrow: Down on Mobile, Hidden on Tablet, Right on Desktop */}
						<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rotate-90 md:hidden lg:block lg:rotate-0 lg:top-1/2 lg:-right-9 lg:left-auto lg:bottom-auto lg:translate-x-0 z-10 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
							<ArrowRight size={32} strokeWidth={4} />
						</div>
					</div>

					{/* Step 3 */}
					<div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col text-left group hover:-translate-y-1 transition-transform duration-300 relative">
						<div className="flex justify-between items-start mb-6">
							<div className="w-12 h-12 bg-black text-[#d4af37] rounded-xl flex items-center justify-center border-2 border-[#d4af37]">
								<Sparkles size={24} />
							</div>
							<div className="text-6xl font-black text-gray-100 select-none">
								03
							</div>
						</div>
						<h3 className="text-xl font-black uppercase mb-2">
							Modified Prompt
						</h3>
						<p className="text-gray-600 text-sm font-medium">
							Promptune automatically injects the precise slash command and
							optimal context parameters.
						</p>
						{/* Arrow: Down on Mobile, Right on Tablet/Desktop */}
						<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 md:top-1/2 md:-right-9 md:left-auto md:bottom-auto md:translate-x-0 z-10 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
							<ArrowRight size={32} strokeWidth={4} />
						</div>
					</div>

					{/* Step 4 */}
					<div className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col text-left group hover:-translate-y-1 transition-transform duration-300 relative">
						<div className="flex justify-between items-start mb-6">
							<div className="w-12 h-12 bg-black text-[#d4af37] rounded-xl flex items-center justify-center border-2 border-[#d4af37]">
								<Zap size={24} fill="#d4af37" />
							</div>
							<div className="text-6xl font-black text-gray-100 select-none">
								04
							</div>
						</div>
						<h3 className="text-xl font-black uppercase mb-2">
							Claude Executes
						</h3>
						<p className="text-gray-600 text-sm font-medium">
							Claude executes the optimized instruction instantly, with context
							persistence handled.
						</p>
					</div>
				</div>
			</div>

			{/* FEATURES SECTION */}
			<div className="max-w-6xl w-full flex flex-col items-center text-center">
				<span className="inline-block bg-[#1a1a1a] text-[#d4af37] border-2 border-[#d4af37] px-4 py-1 rounded-full text-sm font-bold mb-6">
					Features
				</span>
				<h2 className="text-4xl sm:text-5xl font-black uppercase mb-4">
					Powerful <span className="text-[#FFD700]">Features</span>
				</h2>
				<p className="text-[#1a1a1a] font-medium max-w-2xl mb-16">
					Everything you need for next-generation AI-assisted development.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
					{/* Card 1 */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="w-14 h-14 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center mb-6">
							<Zap size={28} fill="#d4af37" />
						</div>
						<h3 className="text-xl font-black mb-3">
							Intent Detection & Auto-Execution
						</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Zero command memorization - Just type naturally, Contextune
							executes the right command.
						</p>
					</div>

					{/* Card 2 */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="w-14 h-14 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center mb-6">
							<Brain size={28} />
						</div>
						<h3 className="text-xl font-black mb-3">Smart Tool Routing</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Intelligent delegation of expensive operations to Haiku for cost
							efficiency.
						</p>
					</div>

					{/* Card 3 */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="w-14 h-14 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center mb-6">
							<Clock size={28} />
						</div>
						<h3 className="text-xl font-black mb-3">
							Session Duration Tracking
						</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Measure context preservation effectiveness - Know exactly how long
							your sessions stay productive.
						</p>
					</div>

					{/* Card 4 */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="w-14 h-14 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center mb-6">
							<DollarSign size={28} />
						</div>
						<h3 className="text-xl font-black mb-3">
							Usage Monitoring & Optimization
						</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Automatic cost optimization based on Claude Code quota
							consumption.
						</p>
					</div>

					{/* Card 5 */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="w-14 h-14 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center mb-6">
							<Sparkles size={28} />
						</div>
						<h3 className="text-xl font-black mb-3">
							Haiku-Powered Interactive Analysis
						</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Intelligent command suggestions using Claude Code headless mode.
						</p>
					</div>

					{/* Card 6 */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="w-14 h-14 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center mb-6">
							<Target size={28} />
						</div>
						<h3 className="text-xl font-black mb-3">Zero-Context Overhead</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Engineered to consume negligible tokens, maximizing the context
							window available for your project.
						</p>
					</div>
				</div>
			</div>

			{/* PERFORMANCE SECTION */}
			<div className="w-full flex flex-col items-center text-center bg-[#5F9632] border-4 border-black rounded-3xl p-8 mb-20">
				<span className="inline-block bg-[#1a1a1a] text-[#d4af37] border-2 border-[#d4af37] px-4 py-1 rounded-full text-sm font-bold mb-6">
					Performance
				</span>
				<h2 className="text-4xl sm:text-5xl font-black uppercase mb-4 text-white">
					Built for <span className="text-[#FFD700]">Speed</span>
				</h2>
				<p className="text-white font-medium max-w-2xl mb-16">
					Engineered for negligible overhead and maximum efficiency.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
					{/* Intent Detection */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-12 h-12 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center">
								<Zap size={24} fill="#d4af37" />
							</div>
							<h3 className="text-xl font-black">Intent Detection</h3>
						</div>

						<div className="space-y-6">
							<div className="flex justify-between items-end border-b border-white/10 pb-4">
								<span className="text-gray-400 font-bold text-sm">
									P50 Latency
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">
										0.02ms
									</div>
									<div className="text-xs text-gray-500">(keyword match)</div>
								</div>
							</div>
							<div className="flex justify-between items-end border-b border-white/10 pb-4">
								<span className="text-gray-400 font-bold text-sm">
									P95 Latency
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">
										&lt;2ms
									</div>
									<div className="text-xs text-gray-500">(90% of queries)</div>
								</div>
							</div>
							<div className="flex justify-between items-end">
								<span className="text-gray-400 font-bold text-sm">
									P99 Latency
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">50ms</div>
									<div className="text-xs text-gray-500">
										(semantic fallback)
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Tool Routing */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-12 h-12 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center">
								<Server size={24} />
							</div>
							<h3 className="text-xl font-black">Tool Routing</h3>
						</div>

						<div className="space-y-6">
							<div className="flex justify-between items-end border-b border-white/10 pb-4">
								<span className="text-gray-400 font-bold text-sm">
									Decision Time
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">
										&lt;1ms
									</div>
								</div>
							</div>
							<div className="flex justify-between items-end border-b border-white/10 pb-4">
								<span className="text-gray-400 font-bold text-sm">
									Cost Savings
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">
										77-87%
									</div>
									<div className="text-xs text-gray-500">per delegation</div>
								</div>
							</div>
							<div className="flex justify-between items-end">
								<span className="text-gray-400 font-bold text-sm">
									Context Life
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">3x</div>
									<div className="text-xs text-gray-500">longer sessions</div>
								</div>
							</div>
						</div>
					</div>

					{/* Usage Monitoring */}
					<div className="bg-[#1a1a1a] text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
						<div className="flex items-center gap-4 mb-8">
							<div className="w-12 h-12 bg-black border-2 border-[#d4af37] text-[#d4af37] rounded-xl flex items-center justify-center">
								<Activity size={24} />
							</div>
							<h3 className="text-xl font-black">Usage Monitoring</h3>
						</div>

						<div className="space-y-6">
							<div className="flex justify-between items-end border-b border-white/10 pb-4">
								<span className="text-gray-400 font-bold text-sm">
									Token Est.
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">
										&lt;1ms
									</div>
								</div>
							</div>
							<div className="flex justify-between items-end border-b border-white/10 pb-4">
								<span className="text-gray-400 font-bold text-sm">
									Headless Query
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">1-2s</div>
								</div>
							</div>
							<div className="flex justify-between items-end">
								<span className="text-gray-400 font-bold text-sm">
									Manual Paste
								</span>
								<div className="text-right">
									<div className="text-[#d4af37] font-black text-xl">
										Instant
									</div>
									<div className="text-xs text-gray-500">(cached)</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* CTA SECTION */}
			<div className="max-w-6xl w-full mb-20">
				<div className="bg-[#1a1a1a] border-4 border-black rounded-[40px] p-12 sm:p-20 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
					{/* Background Grid Pattern */}
					<div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

					<div className="relative z-10 flex flex-col items-center">
						<h2 className="text-4xl sm:text-6xl font-black text-white mb-6 uppercase leading-tight">
							Ready to <span className="text-[#FFD700]">Transform</span> Your
							Workflow?
						</h2>
						<p className="text-gray-400 text-lg sm:text-xl font-medium mb-10 max-w-2xl">
							Start Optimize context flow, Not prompt chaos.
						</p>

						<button className="bg-transparent border-4 border-white text-white px-8 py-4 rounded-full font-black text-lg hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
							<BookOpen size={24} strokeWidth={3} />
							Read the Docs
						</button>
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className="w-full bg-[#0a0a0a] text-white border-4 border-black rounded-[30px] p-10 sm:p-14 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
					{/* Brand Column */}
					<div className="md:col-span-2 flex flex-col gap-6">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-[#d4af37]">
								<Terminal size={24} className="text-black" />
							</div>
							<span className="text-2xl font-black tracking-tighter text-[#d4af37]">
								GifMeTune
							</span>
						</div>
						<p className="text-gray-400 text-sm leading-relaxed max-w-md font-medium">
							Precision-tuned context engineering for Claude Code. Natural
							language to slash command mapping, modular development plans, and
							parallel workflow execution.
						</p>
						<div className="flex gap-4 mt-2">
							<a
								href="#"
								className="text-gray-400 hover:text-[#d4af37] transition-colors"
							>
								<Github size={20} />
							</a>
							<a
								href="https://x.com/ProgonPons"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-[#d4af37] transition-colors"
							>
								<Twitter size={20} />
							</a>
							<a
								href="https://pin.it/1WiTmyyxx"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-[#E60023] transition-colors"
							>
								<Pinterest size={20} />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-[#d4af37] transition-colors"
							>
								<Mail size={20} />
							</a>
						</div>
					</div>

					{/* Resources */}
					<div className="flex flex-col gap-4">
						<h4 className="text-lg font-bold text-white mb-2">Resources</h4>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							Documentation
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							GitHub
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							Discussions
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							Issues
						</a>
					</div>

					{/* Company */}
					<div className="flex flex-col gap-4">
						<h4 className="text-lg font-bold text-white mb-2">Company</h4>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							About
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							Blog
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							Privacy
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm font-medium"
						>
							Terms
						</a>
					</div>
				</div>

				<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
					<p className="text-gray-500 text-sm">
						© 2026 GifMeTune. Licensed under MIT. Built with 💗 for developers.
					</p>
					<a
						href="https://bags.fm/9eKgXLJSPDLHWui5sbqKgvTbxh4FNusbc3Bho6ZrBAGS"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-xs sm:text-sm text-[#FFD700] bg-[#1a1a1a] border border-[#FFD700]/30 px-4 py-2 rounded-full hover:bg-[#FFD700] hover:text-black transition-all"
					>
						<span className="opacity-70 group-hover:opacity-100">CA:</span>
						<span className="font-mono">
							9eKgXLJSPDLHWui5sbqKgvTbxh4FNusbc3Bho6ZrBAGS
						</span>
						<ExternalLink size={12} />
					</a>
				</div>
			</div>
		</div>
	);
}
