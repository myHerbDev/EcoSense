// Mock data for analytics dashboard

// Historical data for trends
export const mockHistoricalData = {
  week: {
    screenTime: [
      { date: "Mon 1", value: 5.2 },
      { date: "Tue 2", value: 4.8 },
      { date: "Wed 3", value: 5.5 },
      { date: "Thu 4", value: 4.9 },
      { date: "Fri 5", value: 6.2 },
      { date: "Sat 6", value: 7.1 },
      { date: "Sun 7", value: 6.5 },
    ],
    energy: [
      { date: "Mon 1", value: 0.8 },
      { date: "Tue 2", value: 0.75 },
      { date: "Wed 3", value: 0.85 },
      { date: "Thu 4", value: 0.78 },
      { date: "Fri 5", value: 0.92 },
      { date: "Sat 6", value: 1.1 },
      { date: "Sun 7", value: 0.95 },
    ],
    appUsage: [
      { date: "Mon 1", value: 2.5 },
      { date: "Tue 2", value: 2.3 },
      { date: "Wed 3", value: 2.7 },
      { date: "Thu 4", value: 2.4 },
      { date: "Fri 5", value: 3.1 },
      { date: "Sat 6", value: 3.5 },
      { date: "Sun 7", value: 3.2 },
    ],
    timeOfDay: [
      { date: "Mon 1", value: 40 },
      { date: "Tue 2", value: 38 },
      { date: "Wed 3", value: 42 },
      { date: "Thu 4", value: 39 },
      { date: "Fri 5", value: 45 },
      { date: "Sat 6", value: 50 },
      { date: "Sun 7", value: 48 },
    ],
  },
  month: {
    screenTime: [
      { date: "Week 1", value: 36.4 },
      { date: "Week 2", value: 34.2 },
      { date: "Week 3", value: 32.8 },
      { date: "Week 4", value: 30.5 },
    ],
    energy: [
      { date: "Week 1", value: 5.6 },
      { date: "Week 2", value: 5.2 },
      { date: "Week 3", value: 5.0 },
      { date: "Week 4", value: 4.7 },
    ],
    appUsage: [
      { date: "Week 1", value: 17.5 },
      { date: "Week 2", value: 16.8 },
      { date: "Week 3", value: 16.2 },
      { date: "Week 4", value: 15.5 },
    ],
    timeOfDay: [
      { date: "Week 1", value: 40 },
      { date: "Week 2", value: 38 },
      { date: "Week 3", value: 36 },
      { date: "Week 4", value: 35 },
    ],
  },
  year: {
    screenTime: [
      { date: "Jan", value: 156 },
      { date: "Feb", value: 148 },
      { date: "Mar", value: 152 },
      { date: "Apr", value: 145 },
      { date: "May", value: 140 },
      { date: "Jun", value: 138 },
      { date: "Jul", value: 142 },
      { date: "Aug", value: 146 },
      { date: "Sep", value: 138 },
      { date: "Oct", value: 135 },
      { date: "Nov", value: 132 },
      { date: "Dec", value: 128 },
    ],
    energy: [
      { date: "Jan", value: 24 },
      { date: "Feb", value: 22.5 },
      { date: "Mar", value: 23.2 },
      { date: "Apr", value: 22.1 },
      { date: "May", value: 21.5 },
      { date: "Jun", value: 21.2 },
      { date: "Jul", value: 21.8 },
      { date: "Aug", value: 22.3 },
      { date: "Sep", value: 21.2 },
      { date: "Oct", value: 20.8 },
      { date: "Nov", value: 20.3 },
      { date: "Dec", value: 19.7 },
    ],
    appUsage: [
      { date: "Jan", value: 75 },
      { date: "Feb", value: 71 },
      { date: "Mar", value: 73 },
      { date: "Apr", value: 70 },
      { date: "May", value: 67 },
      { date: "Jun", value: 66 },
      { date: "Jul", value: 68 },
      { date: "Aug", value: 70 },
      { date: "Sep", value: 66 },
      { date: "Oct", value: 65 },
      { date: "Nov", value: 63 },
      { date: "Dec", value: 61 },
    ],
    timeOfDay: [
      { date: "Jan", value: 40 },
      { date: "Feb", value: 39 },
      { date: "Mar", value: 40 },
      { date: "Apr", value: 38 },
      { date: "May", value: 37 },
      { date: "Jun", value: 36 },
      { date: "Jul", value: 37 },
      { date: "Aug", value: 38 },
      { date: "Sep", value: 36 },
      { date: "Oct", value: 35 },
      { date: "Nov", value: 34 },
      { date: "Dec", value: 33 },
    ],
  },
  dailyPatterns: [
    { time: "Morning", percentage: 15 },
    { time: "Afternoon", percentage: 30 },
    { time: "Evening", percentage: 40 },
    { time: "Night", percentage: 15 },
  ],
  weeklyPatterns: [
    { day: "Monday", hours: 4.8 },
    { day: "Tuesday", hours: 4.5 },
    { day: "Wednesday", hours: 5.2 },
    { day: "Thursday", hours: 4.9 },
    { day: "Friday", hours: 5.5 },
    { day: "Saturday", hours: 6.8 },
    { day: "Sunday", hours: 6.2 },
  ],
  insights: [
    {
      title: "Evening Usage Spike",
      description:
        "Your device usage peaks between 7-10pm, which may affect sleep quality. Consider enabling night mode or reducing screen time during these hours.",
    },
    {
      title: "Weekend Overconsumption",
      description:
        "Your weekend usage is 35% higher than weekdays. Setting screen time limits for entertainment apps could help balance your digital consumption.",
    },
    {
      title: "Positive Trend Detected",
      description: "Your overall screen time has decreased by 8% over the past month. Keep up the good work!",
    },
    {
      title: "Energy Saving Opportunity",
      description:
        "Reducing brightness by 20% could save approximately 0.15 kWh per day, equivalent to 4.5 kWh per month.",
    },
  ],
}

// Comparison data
export const mockComparisonData = {
  screenTime: [
    { category: "Daily Average", you: 5.2, average: 4.5 },
    { category: "Weekly Total", you: 36.4, average: 31.5 },
    { category: "Monthly Total", you: 156, average: 135 },
    { category: "Night Usage", you: 0.8, average: 0.6 },
  ],
  energy: [
    { category: "Daily Average", you: 0.8, average: 0.7 },
    { category: "Weekly Total", you: 5.6, average: 4.9 },
    { category: "Monthly Total", you: 24, average: 21 },
    { category: "Per App", you: 0.15, average: 0.13 },
  ],
  appUsage: [
    { category: "Social Media", you: 2.5, average: 2.1 },
    { category: "Productivity", you: 1.2, average: 1.5 },
    { category: "Entertainment", you: 1.0, average: 0.8 },
    { category: "Other", you: 0.5, average: 0.4 },
  ],
  timeOfDay: [
    { category: "Morning", you: 15, average: 20 },
    { category: "Afternoon", you: 30, average: 35 },
    { category: "Evening", you: 40, average: 30 },
    { category: "Night", you: 15, average: 10 },
  ],
  metrics: [
    { name: "Sustainability Score", value: "68/100", change: -5 },
    { name: "Carbon Footprint", value: "3.2 kg CO₂e/week", change: 8 },
    { name: "Energy Efficiency", value: "B+", change: -10 },
  ],
}

// Environmental impact data
export const mockImpactData = {
  carbon: {
    value: 3.2,
    equivalent: "driving 8 miles in an average car",
    reduction: 25,
  },
  water: {
    value: 450,
    equivalent: "45 ten-minute showers",
    reduction: 30,
  },
  energy: {
    value: 5.6,
    equivalent: "running a refrigerator for 2.5 days",
    reduction: 20,
  },
  trees: {
    value: 0.16,
    equivalent: "You need 0.16 trees to offset your weekly digital carbon emissions",
    reduction: 25,
  },
}
