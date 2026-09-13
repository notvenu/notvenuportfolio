export const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/** Where on the paddle the ball landed: -1 at the top edge, 1 at the bottom.
 *  This is what gives the player control over the return angle. */
export const paddleOffset = (ballY: number, paddleY: number, paddleH: number) =>
  clamp((ballY - (paddleY + paddleH / 2)) / (paddleH / 2), -1, 1);

/** Reflect off a paddle. `dir` is 1 when the ball should now travel right.
 *  Speed is preserved exactly; only the angle changes. */
export const reflect = (
  offset: number,
  dir: 1 | -1,
  speed: number,
  maxAngle = Math.PI * 0.28,
) => {
  const angle = offset * maxAngle;
  return { vx: dir * Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
};
