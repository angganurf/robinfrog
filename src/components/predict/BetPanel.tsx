import React, { useState } from "react";

interface Props {
	onBet: (direction: "up" | "down", amount: number) => Promise<void>;
	isDisabled: boolean;
	status: "betting" | "locked" | "resolved" | "waiting";
	walletBalance: number;
}

const QUICK_AMOUNTS = [
	{ label: "MIN", value: 0.01 },
	{ label: "0.1", value: 0.1 },
	{ label: "0.5", value: 0.5 },
	{ label: "1", value: 1 },
];

const BetPanel: React.FC<Props> = ({
	onBet,
	isDisabled,
	status,
	walletBalance,
}) => {
	const [amount, setAmount] = useState<string>("0.1");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedDirection, setSelectedDirection] = useState<
		"up" | "down" | null
	>(null);

	const handleBet = async (direction: "up" | "down") => {
		const numAmount = parseFloat(amount);
		if (isNaN(numAmount) || numAmount < 0.01) return;
		if (numAmount > walletBalance) return;

		setIsLoading(true);
		setSelectedDirection(direction);
		try {
			await onBet(direction, numAmount);
		} catch (err) {
			console.error("Bet failed:", err);
		} finally {
			setIsLoading(false);
			setSelectedDirection(null);
		}
	};

	const disabled = isDisabled || status !== "betting" || isLoading;

	return (
		<div className="rounded-xl border border-gray-700/50 bg-gray-900/50 p-4 backdrop-blur-sm">
			<div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">
				Place Your Bet
			</div>

			{/* Amount Input */}
			<div className="mb-3">
				<label className="text-xs text-gray-500 mb-1 block">
					Amount (SOL)
				</label>
				<div className="relative">
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						min="0.01"
						step="0.01"
						disabled={disabled}
						className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed"
						placeholder="0.01"
					/>
					<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono">
						SOL
					</span>
				</div>
			</div>

			{/* Quick Amount Buttons */}
			<div className="grid grid-cols-4 gap-2 mb-4">
				{QUICK_AMOUNTS.map(({ label, value }) => (
					<button
						key={label}
						onClick={() => setAmount(value.toString())}
						disabled={disabled}
						className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs font-mono py-1.5 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-600"
					>
						{label}
					</button>
				))}
			</div>

			{/* UP / DOWN Buttons */}
			<div className="grid grid-cols-2 gap-3">
				<button
					onClick={() => handleBet("up")}
					disabled={disabled}
					className="relative bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-green-500/20"
				>
					{isLoading && selectedDirection === "up" ? (
						<div className="flex items-center justify-center gap-2">
							<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							<span className="text-sm">Confirming...</span>
						</div>
					) : (
						<>
							<div className="text-2xl mb-0.5">▲</div>
							<div className="text-sm font-bold tracking-wider">
								UP
							</div>
						</>
					)}
				</button>

				<button
					onClick={() => handleBet("down")}
					disabled={disabled}
					className="relative bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-red-500/20"
				>
					{isLoading && selectedDirection === "down" ? (
						<div className="flex items-center justify-center gap-2">
							<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
							<span className="text-sm">Confirming...</span>
						</div>
					) : (
						<>
							<div className="text-2xl mb-0.5">▼</div>
							<div className="text-sm font-bold tracking-wider">
								DOWN
							</div>
						</>
					)}
				</button>
			</div>

			{/* Status Messages */}
			{status === "locked" && (
				<div className="mt-3 text-center text-xs text-amber-400 bg-amber-500/10 rounded-lg py-2 border border-amber-500/20">
					⏸ Betting locked — waiting for resolution
				</div>
			)}
			{status === "resolved" && (
				<div className="mt-3 text-center text-xs text-blue-400 bg-blue-500/10 rounded-lg py-2 border border-blue-500/20">
					✅ Epoch resolved — check results below
				</div>
			)}
			{status === "waiting" && (
				<div className="mt-3 text-center text-xs text-gray-400 bg-gray-500/10 rounded-lg py-2 border border-gray-500/20">
					⏳ Waiting for next epoch to start...
				</div>
			)}

			{/* Balance */}
			<div className="mt-3 text-center">
				<span className="text-xs text-gray-500">Balance: </span>
				<span className="text-xs text-gray-300 font-mono">
					{walletBalance.toFixed(4)} SOL
				</span>
			</div>
		</div>
	);
};

export default BetPanel;
