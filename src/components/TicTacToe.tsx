"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Cell = "X" | "O" | null;
type Board = Cell[];

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const HUMAN: Cell = "X";
const AI: Cell = "O";

function winner(board: Board): { player: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}

function isDraw(board: Board) {
  return board.every((c) => c !== null) && !winner(board);
}

function minimax(board: Board, player: Cell): number {
  const win = winner(board);
  if (win) return win.player === AI ? 1 : -1;
  if (isDraw(board)) return 0;

  const scores = board
    .map((cell, i) => (cell === null ? i : -1))
    .filter((i) => i !== -1)
    .map((i) => {
      const next = [...board];
      next[i] = player;
      return minimax(next, player === AI ? HUMAN : AI);
    });

  return player === AI ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Board): number {
  let best = -Infinity;
  let move = -1;
  board.forEach((cell, i) => {
    if (cell !== null) return;
    const next = [...board];
    next[i] = AI;
    const score = minimax(next, HUMAN);
    if (score > best) {
      best = score;
      move = i;
    }
  });
  return move;
}

export default function TicTacToe() {
  const { t } = useI18n();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<Cell>(HUMAN);
  const [score, setScore] = useState({ you: 0, me: 0, draw: 0 });

  const win = winner(board);
  const draw = isDraw(board);
  const over = Boolean(win || draw);

  useEffect(() => {
    if (over || turn !== AI) return;
    const id = setTimeout(() => {
      const move = bestMove(board);
      if (move === -1) return;
      setBoard((prev) => {
        const next = [...prev];
        next[move] = AI;
        return next;
      });
      setTurn(HUMAN);
    }, 450);
    return () => clearTimeout(id);
  }, [board, turn, over]);

  useEffect(() => {
    if (!win && !draw) return;
    setScore((s) =>
      win
        ? win.player === HUMAN
          ? { ...s, you: s.you + 1 }
          : { ...s, me: s.me + 1 }
        : { ...s, draw: s.draw + 1 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win?.player, draw]);

  const play = (i: number) => {
    if (over || turn !== HUMAN || board[i] !== null) return;
    setBoard((prev) => {
      const next = [...prev];
      next[i] = HUMAN;
      return next;
    });
    setTurn(AI);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn(HUMAN);
  };

  const statusText = useMemo(() => {
    if (win) return win.player === HUMAN ? t.game.youWin : t.game.iWin;
    if (draw) return t.game.draw;
    return turn === HUMAN ? t.game.yourTurn : t.game.myTurn;
  }, [win, draw, turn, t]);

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <p className="font-display text-base font-semibold text-center mb-1">{t.game.title}</p>
      <p className="text-text-faint text-xs text-center mb-5">{t.game.subtitle}</p>

      <div className="flex items-center justify-center gap-6 mb-4 text-xs text-text-dim">
        <span>
          {t.game.you}: <span className="text-text font-medium">{score.you}</span>
        </span>
        <span>
          {t.game.score}: <span className="text-text font-medium">{score.draw}</span>
        </span>
        <span>
          {t.game.me}: <span className="text-text font-medium">{score.me}</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, i) => {
          const onWinLine = win?.line.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              data-cursor-hover
              disabled={over || cell !== null || turn !== HUMAN}
              aria-label={`Cell ${i + 1}${cell ? `: ${cell}` : ""}`}
              className={`aspect-square rounded-xl border flex items-center justify-center font-display text-2xl font-bold transition-colors ${
                onWinLine
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface hover:bg-surface-hover"
              } ${!cell && !over && turn === HUMAN ? "cursor-pointer" : "cursor-default"}`}
            >
              <AnimatePresence>
                {cell && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={cell === HUMAN ? "text-text" : "gradient-text"}
                  >
                    {cell}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-text-dim">{statusText}</p>
        {over && (
          <button
            type="button"
            onClick={reset}
            data-cursor-hover
            className="text-xs uppercase tracking-wide text-accent hover:text-accent-2 transition-colors shrink-0"
          >
            {t.game.playAgain}
          </button>
        )}
      </div>
    </div>
  );
}
