function useInches(mm: number) {
  const inches = (mm / 25.4).toFixed(2).replace("0.", ".") + '"';
  return inches;
}

export default useInches;
