import { useRef, useEffect } from 'react'
import Chart, { ChartConfiguration } from 'chart.js/auto'
import React from 'react'
import { usePreferenceQuery } from '@/query/personal/useQueryPersonal'

import type { ResultChartProps } from '@/types/personal/type'

const ResultChart: React.FC<ResultChartProps> = ({ userChar }) => {
  const mbtiStatus = userChar.mbti

  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  const preference = usePreferenceQuery(mbtiStatus)

  useEffect(() => {
    if (preference) {
      const labels = Object.keys(preference)
      const preferenceData = Object.values(preference)

      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }
        const context = chartRef.current.getContext('2d')

        if (context) {
          const newChart = new Chart(context, {
            type: 'radar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: '장르별 음악 선호도',
                  data: preferenceData,
                  borderColor: 'green',
                  borderWidth: 3,
                  pointBackgroundColor: 'rgb(56, 238, 65)',
                  pointBorderColor: '#fff',
                },
              ],
            },
            options: {
              scales: {
                r: {
                  angleLines: {
                    color: 'white',
                  },
                  grid: {
                    color: 'white',
                  },
                  pointLabels: {
                    color: 'white',
                    font: {
                      size: 15,
                    },
                  },
                  ticks: {
                    color: 'blue',
                  },
                },
              },
              responsive: false,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14,
                    },
                    color: 'white',
                  },
                },
                title: {
                  display: false,

                  color: 'white',
                  font: {
                    size: 20,
                  },
                },
              },
            },
          } as ChartConfiguration)
          chartInstance.current = newChart
        }
      }
    }
  }, [preference, chartRef.current])

  return (
    <div className=' flex justify-center pt-[24px]'>
      <canvas ref={chartRef} width={400} height={300} />
    </div>
  )
}

export default ResultChart
