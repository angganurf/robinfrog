import React, { useState, useEffect, useCallback } from "react";

interface Props {
	startTime: number; // Unix timestamp
	lockTime: number;
	endTime: number;
	status: "betting" | "locked" | "resolved" | "waiting";
}

const EpochTimer: React.FC<Props> = ({
	startTime,
	lockTime,
	endTime,
	status,
}) => {
	const [now, setNow] = useState(Date.now() / 1000);

	useEffect(() => {
		const interval = setInterval(() => {
			setNow(Date.now() / 1000);
		}, 100);
		return () => clearInterval(interval);
	}, []);

	const getTimeLeft = useCallback(() => {
		if (status === "waiting") return { minutes: 0, seconds: 0 };
		const target = status === "betting" ? lockTime : endTime;
		const remaining = Math.max(0, target - now);
		return {
			minutes: Math.floor(remaining / 60),
			seconds: Math.floor(remaining % 60),
		};
	}, [now, status, lockTime, endTime]);

	const getProgress = useCallback(() => {
		if (status === "waiting") return 0;
		const total = endTime - startTime;
		const elapsed = now - startTime;
		return Math.min(100, Math.max(0, (elapsed / total) * 100));
	}, [now, status, startTime, endTime]);

	const { minutes, seconds } = getTimeLeft();
	const progress = getProgress();

	const statusConfig = {
		betting: {
			label: "BETTING OPEN",
			color: "text-green-400",
			bgColor: "bg-green-500/20",
			borderColor: "border-green-500/40",
			barColor: "bg-green-500",
			pulseColor: "bg-green-400",
			icon: "🟢",
		},
		locked: {
			label: "LOCKED",
			color: "text-amber-400",
			bgColor: "bg-amber-500/20",
			borderColor: "border-amber-500/40",
			barColor: "bg-amber-500",
			pulseColor: "bg-amber-400",
			icon: "🟡",
		},
		resolved: {
			label: "RESOLVED",
			color: "text-blue-400",
			bgColor: "bg-blue-500/20",
			borderColor: "border-blue-500/40",
			barColor: "bg-blue-500",
			pulseColor: "bg-blue-400",
			icon: "🔵",
		},
		waiting: {
			label: "WAITING",
			color: "text-gray-400",
			bgColor: "bg-gray-500/20",
			borderColor: "border-gray-500/40",
			barColor: "bg-gray-500",
			pulseColor: "bg-gray-400",
			icon: "⏳",
		},
	};

	const config = statusConfig[status];

	return (
		<div
			className={`rounded-xl border ${config.borderColor} ${config.bgColor} p-4 backdrop-blur-sm`}
		>
			{/* Status Badge */}
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<span className="text-sm">{config.icon}</span>
					<span
						className={`text-xs font-bold tracking-wider ${config.color}`}
					>
						{config.label}
					</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div
						className={`w-2 h-2 rounded-full ${config.pulseColor} animate-pulse`}
					/>
					<span className="text-xs text-gray-500 font-mono">
						LIVE
					</span>
				</div>
			</div>

			{/* Timer Display */}
			<div className="text-center mb-3">
				<div className="text-4xl font-bold font-mono text-white tracking-wider">
					{String(minutes).padStart(2, "0")}:
					{String(seconds).padStart(2, "0")}
				</div>
				<div className="text-xs text-gray-500 mt-1">
					{status === "betting"
						? "until lock"
						: status === "locked"
							? "until resolution"
							: "epoch complete"}
				</div>
			</div>

			{/* Progress Bar */}
			<div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
				<div
					className={`${config.barColor} h-full rounded-full transition-all duration-200 ease-linear`}
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

export default EpochTimer;
