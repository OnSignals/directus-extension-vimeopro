const secondsToHHMMSS = (seconds) => {
  const secondsNum = parseInt(seconds, 10);
  const h = Math.floor(secondsNum / 3600);
  const m = Math.floor(secondsNum / 60) % 60;
  const s = secondsNum % 60;

  return [h, m, s]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export { secondsToHHMMSS };
