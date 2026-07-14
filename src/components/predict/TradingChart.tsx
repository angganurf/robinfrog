import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";
import type { IChartApi } from "lightweight-charts";
import { CandleData } from "../../hooks/useBtcPrice";

interface Props {
	candles: CandleData[];
	currentPrice: number;
}

const TradingChart: React.FC<Props> = ({ candles, currentPrice }) => {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const candleSeriesRef = useRef<any>(null);
	const volumeSeriesRef = useRef<any>(null);

	useEffect(() => {
		if (!chartContainerRef.current) return;

		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: { type: ColorType.Solid, color: "transparent" },
				textColor: "#9ca3af",
				fontSize: 12,
			},
			grid: {
				vertLines: { color: "rgba(42, 46, 57, 0.5)" },
				horzLines: { color: "rgba(42, 46, 57, 0.5)" },
			},
			crosshair: {
				mode: 0,
				vertLine: {
					color: "rgba(224, 227, 235, 0.2)",
					style: 1,
				},
				horzLine: {
					color: "rgba(224, 227, 235, 0.2)",
					style: 1,
				},
			},
			rightPriceScale: {
				borderColor: "rgba(42, 46, 57, 0.8)",
				scaleMargins: { top: 0.1, bottom: 0.2 },
			},
			timeScale: {
				borderColor: "rgba(42, 46, 57, 0.8)",
				timeVisible: true,
				secondsVisible: false,
			},
			handleScroll: { vertTouchDrag: false },
		});

		// lightweight-charts v5 uses addSeries with type parameter
		const candleSeries = (chart as any).addCandlestickSeries
			? (chart as any).addCandlestickSeries({
					upColor: "#22c55e",
					downColor: "#ef4444",
					borderDownColor: "#ef4444",
					borderUpColor: "#22c55e",
					wickDownColor: "#ef4444",
					wickUpColor: "#22c55e",
				})
			: (chart as any).addSeries("Candlestick", {
					upColor: "#22c55e",
					downColor: "#ef4444",
					borderDownColor: "#ef4444",
					borderUpColor: "#22c55e",
					wickDownColor: "#ef4444",
					wickUpColor: "#22c55e",
				});

		const volumeSeries = (chart as any).addHistogramSeries
			? (chart as any).addHistogramSeries({
					color: "#26a69a",
					priceFormat: { type: "volume" },
					priceScaleId: "",
				})
			: (chart as any).addSeries("Histogram", {
					color: "#26a69a",
					priceFormat: { type: "volume" },
					priceScaleId: "",
				});

		volumeSeries.priceScale().applyOptions({
			scaleMargins: { top: 0.8, bottom: 0 },
		});

		chartRef.current = chart;
		candleSeriesRef.current = candleSeries;
		volumeSeriesRef.current = volumeSeries;

		const handleResize = () => {
			if (chartContainerRef.current) {
				chart.applyOptions({
					width: chartContainerRef.current.clientWidth,
				});
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
			chart.remove();
		};
	}, []);

	// Update data when candles change
	useEffect(() => {
		if (!candleSeriesRef.current || !volumeSeriesRef.current) return;
		if (candles.length === 0) return;

		const candleData = candles.map((c) => ({
			time: c.time,
			open: c.open,
			high: c.high,
			low: c.low,
			close: c.close,
		}));

		const volumeData = candles.map((c) => ({
			time: c.time,
			value: c.volume,
			color:
				c.close >= c.open
					? "rgba(34,197,94,0.3)"
					: "rgba(239,68,68,0.3)",
		}));

		candleSeriesRef.current.setData(candleData);
		volumeSeriesRef.current.setData(volumeData);
	}, [candles]);

	return (
		<div className="relative w-full h-full">
			<div ref={chartContainerRef} className="w-full h-full" />
			{currentPrice > 0 && (
				<div className="absolute top-3 left-3 z-10">
					<div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
						BTC/USD · 5m
					</div>
					<div className="text-2xl font-bold text-white font-mono">
						$
						{currentPrice.toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default TradingChart;
