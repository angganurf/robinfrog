import React from "react";

interface Props {
	totalUpAmount: number; // in SOL
	totalDownAmount: number; // in SOL
	totalBets: number;
}

const PoolStats: React.FC<Props> = ({
	totalUpAmount,
	totalDownAmount,
	totalBets,
}) => {
	const totalPool = totalUpAmount + totalDownAmount;
	const upPercent = totalPool > 0 ? (totalUpAmount / totalPool) * 100 : 50;
	const downPercent = totalPool > 0 ? (totalDownAmount / totalPool) * 100 : 50;
	const upMultiplier =
		totalUpAmount > 0 ? totalPool / totalUpAmount : 0;
	const downMultiplier =
		totalDownAmount > 0 ? totalPool / totalDownAmount : 0;

	return (
		<div className="rounded-xl border border-gray-700/50 bg-gray-900/50 p-4 backdrop-blur-sm">
			<div className="flex items-center justify-between mb-3">
				<span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
					Pool Stats
				</span>
				<span className="text-xs text-gray-500 font-mono">
					{totalBets} bets
				</span>
			</div>

			{/* Pool Bar */}
			<div className="relative mb-4">
				<div className="flex h-8 rounded-lg overflow-hidden bg-gray-800">
					<div
						className="bg-gradient-to-r from-green-600 to-green-500 transition-all duration-500 ease-out flex items-center justify-center"
						style={{ width: `${upPercent}%`, minWidth: "20%" }}
					>
						<span className="text-xs font-bold text-white drop-shadow">
							{upPercent.toFixed(1)}%
						</span>
					</div>
					<div
						className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-out flex items-center justify-center"
						style={{ width: `${downPercent}%`, minWidth: "20%" }}
					>
						<span className="text-xs font-bold text-white drop-shadow">
							{downPercent.toFixed(1)}%
						</span>
					</div>
				</div>
				<div className="flex justify-between mt-1.5">
					<span className="text-xs text-green-400 font-mono">
						▲ UP
					</span>
					<span className="text-xs text-red-400 font-mono">
						DOWN ▼
					</span>
				</div>
			</div>

			{/* Detailed Stats */}
			<div className="grid grid-cols-2 gap-3">
				<div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
					<div className="text-xs text-green-400/70 mb-1">
						UP Pool
					</div>
					<div className="text-sm font-bold text-green-400 font-mono">
						{totalUpAmount.toFixed(2)} SOL
					</div>
					<div className="text-xs text-green-400/50 mt-1 font-mono">
						{upMultiplier > 0
							? `${upMultiplier.toFixed(2)}x`
							: "—"}
					</div>
				</div>
				<div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
					<div className="text-xs text-red-400/70 mb-1">
						DOWN Pool
					</div>
					<div className="text-sm font-bold text-red-400 font-mono">
						{totalDownAmount.toFixed(2)} SOL
					</div>
					<div className="text-xs text-red-400/50 mt-1 font-mono">
						{downMultiplier > 0
							? `${downMultiplier.toFixed(2)}x`
							: "—"}
					</div>
				</div>
			</div>

			{/* Total Liquidity */}
			<div className="mt-3 text-center">
				<span className="text-xs text-gray-500">Total Liquidity</span>
				<div className="text-base font-bold text-white font-mono">
					{totalPool.toFixed(2)} SOL
				</div>
			</div>
		</div>
	);
};

export default PoolStats;
