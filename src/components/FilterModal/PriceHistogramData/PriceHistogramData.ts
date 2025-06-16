// Sample price distribution data for the histogram
export const priceDistributionData = Array.from({ length: 40 }, (_, i) => ({
  price: i * 10,
  count: Math.floor(
    10 + 
    50 * Math.sin((i / 39) * Math.PI) +  // Base sine wave
    (Math.random() * 20 - 10) // Random irregularity (-10 to +10)
  )
}))