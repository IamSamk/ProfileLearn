import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
  title?: string;
  cutout?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ 
  labels, 
  datasets, 
  title,
  cutout = '70%'
}) => {
  const options = {
    cutout,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      title: {
        display: !!title,
        text: title || '',
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }
    },
    maintainAspectRatio: false,
    layout: {
      padding: 20
    }
  };

  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      borderWidth: dataset.borderWidth || 2,
      hoverOffset: 15
    }))
  };

  return (
    <div className="w-full h-80">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;