import { useState, useEffect, useRef, useCallback } from "react";

export interface CandleData {
	time: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}

const BINANCE_WS = "wss://stream.binance.com:9443/ws/btcusdt@kline_5m";
const BINANCE_REST =
	"https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=100";

export const useBtcPrice = () => {
	const [candles, setCandles] = useState<CandleData[]>([]);
	const [currentPrice, setCurrentPrice] = useState<number>(0);
	const [priceChange, setPriceChange] = useState<number>(0);
	const wsRef = useRef<WebSocket | null>(null);

	// Fetch historical candles on mount
	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const res = await fetch(BINANCE_REST);
				const data = await res.json();
				const mapped: CandleData[] = data.map((k: any[]) => ({
					time: Math.floor(k[0] / 1000),
					open: parseFloat(k[1]),
					high: parseFloat(k[2]),
					low: parseFloat(k[3]),
					close: parseFloat(k[4]),
					volume: parseFloat(k[5]),
				}));
				setCandles(mapped);
				if (mapped.length > 0) {
					const last = mapped[mapped.length - 1];
					setCurrentPrice(last.close);
					if (mapped.length > 1) {
						const prev = mapped[mapped.length - 2];
						setPriceChange(
							((last.close - prev.close) / prev.close) * 100
						);
					}
				}
			} catch (err) {
				console.error("Failed to fetch BTC history:", err);
			}
		};
		fetchHistory();
	}, []);

	// WebSocket live updates
	useEffect(() => {
		const ws = new WebSocket(BINANCE_WS);
		wsRef.current = ws;

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const k = data.k;
			const candle: CandleData = {
				time: Math.floor(k.t / 1000),
				open: parseFloat(k.o),
				high: parseFloat(k.h),
				low: parseFloat(k.l),
				close: parseFloat(k.c),
				volume: parseFloat(k.v),
			};

			setCurrentPrice(candle.close);

			setCandles((prev) => {
				const newCandles = [...prev];
				const lastIdx = newCandles.length - 1;
				if (lastIdx >= 0 && newCandles[lastIdx].time === candle.time) {
					newCandles[lastIdx] = candle;
				} else {
					newCandles.push(candle);
					// Calculate price change
					if (newCandles.length > 1) {
						const prevCandle = newCandles[newCandles.length - 2];
						setPriceChange(
							((candle.close - prevCandle.close) /
								prevCandle.close) *
								100
						);
					}
				}
				// Keep last 200 candles
				if (newCandles.length > 200) newCandles.shift();
				return newCandles;
			});
		};

		ws.onerror = (err) => console.error("BTC WS error:", err);

		return () => {
			ws.close();
		};
	}, []);

	return { candles, currentPrice, priceChange };
};
