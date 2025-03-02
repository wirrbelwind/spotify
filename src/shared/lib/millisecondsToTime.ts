export const millisecondsToTime = (ms: number) => {
	if (ms < 0) {
    throw new Error("Milliseconds must be a non-negative number");
  }

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}