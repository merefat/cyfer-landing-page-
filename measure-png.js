// Minimal PNG decoder + white-card bounds scanner (Node built-ins only)
const fs = require("fs");
const zlib = require("zlib");

function decode(fn) {
  const b = fs.readFileSync(fn);
  let o = 8, w = 0, h = 0, ct = 6;
  const idat = [];
  while (o < b.length) {
    const len = b.readUInt32BE(o);
    const type = b.toString("ascii", o + 4, o + 8);
    const data = b.slice(o + 8, o + 8 + len);
    o += 12 + len;
    if (type === "IHDR") {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      ct = data[9];
    }
    if (type === "IDAT") idat.push(data);
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const ch = ct === 6 ? 4 : ct === 2 ? 3 : ct === 0 ? 1 : ct === 4 ? 2 : 1;
  const stride = w * ch;
  const out = Buffer.alloc(h * stride);
  const paeth = (a, bb, c) => {
    const p = a + bb - c,
      pa = Math.abs(p - a),
      pb = Math.abs(p - bb),
      pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? bb : c;
  };
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    const line = raw.slice(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const prev = y ? out.slice((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    const cur = out.slice(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0,
        bb = prev[x],
        c = x >= ch ? prev[x - ch] : 0;
      cur[x] =
        f === 0 ? line[x]
        : f === 1 ? (line[x] + a) & 255
        : f === 2 ? (line[x] + bb) & 255
        : f === 3 ? (line[x] + ((a + bb) >> 1)) & 255
        : (line[x] + paeth(a, bb, c)) & 255;
    }
  }
  return { w, h, ch, data: out, stride };
}

function scan(fn) {
  const { w, h, ch, data, stride } = decode(fn);
  const isWhite = (x, y) => {
    const i = y * stride + x * ch;
    const r = data[i], g = data[i + 1], bl = data[i + 2];
    return r > 238 && g > 238 && bl > 238;
  };
  // per-row longest run of white px
  const rows = [];
  for (let y = 0; y < h; y++) {
    let best = 0, run = 0, bx0 = 0, x0 = 0;
    for (let x = 0; x < w; x++) {
      if (isWhite(x, y)) {
        if (run === 0) x0 = x;
        run++;
        if (run > best) { best = run; bx0 = x0; }
      } else run = 0;
    }
    rows.push({ y, best, bx0, bx1: bx0 + best });
  }
  // card rows = rows whose white run covers >55% of width
  const cardRows = rows.filter((r) => r.best > w * 0.55);
  if (!cardRows.length) { console.log(fn, "no card found"); return; }
  const y0 = cardRows[0].y, y1 = cardRows[cardRows.length - 1].y;
  let x0 = w, x1 = 0;
  for (const r of cardRows) { if (r.bx0 < x0) x0 = r.bx0; if (r.bx1 > x1) x1 = r.bx1; }
  console.log(
    `${fn.split("\\").pop()}: ${w}x${h}  card { x:${x0}, y:${y0}, w:${x1 - x0}, h:${y1 - y0} }`
  );
  // print a coarse brightness map to eyeball field rows (every 20th row: run extents)
  const mid = cardRows.filter((_, i) => i % 40 === 0);
  for (const r of mid) console.log(`   y=${r.y} white run x ${r.bx0}..${r.bx1}`);
}

const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".png") && f.includes("modal"))) {
  scan(dir + "\\" + f);
}
