import { strict as assert } from "node:assert";
import test from "node:test";
import { clamp, paddleOffset, reflect } from "./pong-math.ts";

const mag = (v: { vx: number; vy: number }) => Math.hypot(v.vx, v.vy);

test("clamp bounds a value", () => {
  assert.equal(clamp(5, 0, 1), 1);
  assert.equal(clamp(-5, 0, 1), 0);
  assert.equal(clamp(0.5, 0, 1), 0.5);
});

test("paddle offset is 0 dead centre and saturates at the edges", () => {
  assert.equal(paddleOffset(150, 100, 100), 0);
  assert.equal(paddleOffset(100, 100, 100), -1);
  assert.equal(paddleOffset(200, 100, 100), 1);
  // Past the edge still clamps, it never returns a wilder angle.
  assert.equal(paddleOffset(400, 100, 100), 1);
});

test("a centre hit returns flat, at full speed, in the given direction", () => {
  const v = reflect(0, 1, 10);
  assert.ok(Math.abs(v.vy) < 1e-9, "no vertical drift off a centre hit");
  assert.ok(Math.abs(v.vx - 10) < 1e-9);
});

test("reflect preserves speed at every angle", () => {
  for (const offset of [-1, -0.5, 0, 0.37, 1]) {
    for (const dir of [1, -1] as const) {
      assert.ok(Math.abs(mag(reflect(offset, dir, 12)) - 12) < 1e-9);
    }
  }
});

test("direction is honoured and the ball never stalls horizontally", () => {
  assert.ok(reflect(1, 1, 10).vx > 0);
  assert.ok(reflect(-1, -1, 10).vx < 0);
});
