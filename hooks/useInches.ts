function useInches(mm: number | undefined) {
  if (!mm || mm < 0.254) return;
  const inches = (mm / 25.4).toFixed(2).replace("0.", ".") + '"';
  if (inches) return inches;
}

export default useInches;
