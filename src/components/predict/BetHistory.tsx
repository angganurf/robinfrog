import React, { useState } from "react";

export interface BetRecord {
	epochId: number;
	direction: "up" | "down";
	amount: number; // SOL
	status: "active" | "won" | "lost" | "draw" | "claimable";
	payout?: number;
	startPrice?: number;
	endPrice?: number;
	timestamp: number;
}

interface Props {
	bets: BetRecord[];
	onClaim: (epochId: number) => Promise<void>;
}

const BetHistory: React.FC<Props> = ({ bets, onClaim }) => {
	const [activeTab, setActiveTab] = useState<
		"active" | "history" | "claimable"
	>("active");
	const [claimingId, setClaimingId] = useState<number | null>(null);

	const filteredBets = bets.filter((b) => {
		if (activeTab === "active") return b.status === "active";
		if (activeTab === "claimable") return b.status === "claimable";
		return ["won", "lost", "draw"].includes(b.status);
	});

	const handleClaim = async (epochId: number) => {
		setClaimingId(epochId);
		try {
			await onClaim(epochId);
		} finally {
			setClaimingId(null);
		}
	};

	const tabs = [
		{ key: "active", label: "Active", count: bets.filter((b) => b.status === "active").length },
		{ key: "history", label: "History", count: bets.filter((b) => ["won", "lost", "draw"].includes(b.status)).length },
		{
			key: "claimable",
			label: "Claimable",
			count: bets.filter((b) => b.status === "claimable").length,
		},
	] as const;

	return (
		<div className="rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
			{/* Tabs */}
			<div className="flex border-b border-gray-700/50">
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`flex-1 py-3 text-xs font-bold tracking-wider transition-all ${
							activeTab === tab.key
								? "text-white border-b-2 border-blue-500 bg-blue-500/5"
								: "text-gray-500 hover:text-gray-300"
						}`}
					>
						{tab.label}
						{tab.count > 0 && (
							<span
								className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
									activeTab === tab.key
										? "bg-blue-500/30 text-blue-300"
										: tab.key === "claimable"
											? "bg-green-500/30 text-green-300"
											: "bg-gray-700 text-gray-400"
								}`}
							>
								{tab.count}
							</span>
						)}
					</button>
				))}
			</div>

			{/* Content */}
			<div className="p-3 max-h-60 overflow-y-auto">
				{filteredBets.length === 0 ? (
					<div className="text-center py-8 text-gray-500 text-sm">
						{activeTab === "active"
							? "No active bets"
							: activeTab === "claimable"
								? "No claimable winnings"
								: "No bet history"}
					</div>
				) : (
					<div className="space-y-2">
						{filteredBets.map((bet) => (
							<div
								key={bet.epochId}
								className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-700/30"
							>
								<div className="flex items-center gap-3">
									<div
										className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
											bet.direction === "up"
												? "bg-green-500/20 text-green-400"
												: "bg-red-500/20 text-red-400"
										}`}
									>
										{bet.direction === "up" ? "▲" : "▼"}
									</div>
									<div>
										<div className="text-xs text-gray-400">
											Epoch #{bet.epochId}
										</div>
										<div className="text-sm text-white font-mono">
											{bet.amount.toFixed(2)} SOL
										</div>
									</div>
								</div>

								<div className="text-right">
									{bet.status === "active" && (
										<span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
											Live
										</span>
									)}
									{bet.status === "won" && (
										<span className="text-xs text-green-400">
											Won +{bet.payout?.toFixed(2)} SOL
										</span>
									)}
									{bet.status === "lost" && (
										<span className="text-xs text-red-400">
											Lost
										</span>
									)}
									{bet.status === "draw" && (
										<span className="text-xs text-gray-400">
											Draw (refunded)
										</span>
									)}
									{bet.status === "claimable" && (
										<button
											onClick={() =>
												handleClaim(bet.epochId)
											}
											disabled={
												claimingId === bet.epochId
											}
											className="bg-green-500 hover:bg-green-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
										>
											{claimingId === bet.epochId ? (
												<span className="flex items-center gap-1">
													<div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
													Claiming
												</span>
											) : (
												`Claim ${bet.payout?.toFixed(2)} SOL`
											)}
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default BetHistory;
