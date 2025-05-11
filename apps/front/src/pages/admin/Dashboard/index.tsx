import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import CountUp from 'react-countup';

import { AppLoader } from '../../../components/AppLoader';
import { useCategories } from '../../../hooks/useCategory';

export function Dashboard() {
  const { data: categories } = useCategories();

  const [sCol2, set] = useState<any>(null);

  useEffect(() => {
    if (categories) {
      set({
        series: [
          {
            name: 'Categories',
            colors: ['#FFC38F'],
            data: categories.items.map((category) => ({
              x: category.name,
              y: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
            })),
          },
        ],
        chart: {
          type: 'bar',
          height: 260,
        },
        plotOptions: {
          bar: {
            borderRadiusApplication: 'around',
            columnWidth: '40%',
          },
        },
        colors: ['#00918E'],
        xaxis: {
          type: 'category',
          group: {
            style: {
              fontSize: '7px',
              fontWeight: 700,
            },
          },
        },
      });
    }
  }, [categories, set]);

  if (!sCol2) {
    return <AppLoader />;
  }

  return (
    <div className="d-flex flex-column">
      <div className="row mb-4">
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-primary-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-user" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Clients</span>
                    <h5>
                      <span className="counter">
                        <CountUp end={156} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-secondary-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-user" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Providers</span>
                    <h5>
                      <span className="counter">
                        <CountUp end={32} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-success-transparent d-flex justify-content-center align-items-center rounded-circle ">
                    <i className="ti ti-cards" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Services</span>
                    <h5>
                      <span className="counter">
                        <CountUp end={286} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6">
          <div className="card dash-widget">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="dash-icon bg-info-transparent d-flex justify-content-center align-items-center rounded-circle">
                    <i className="ti ti-cards" />
                  </span>
                  <div className="ms-2">
                    <span className="fs-14">Total Bookings</span>
                    <h5>
                      <span className="counter">
                        <CountUp end={538} duration={2} />
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex">
        <div className="card flex-fill">
          <div className="card-body">
            <h6 className="mb-4">Categories</h6>
            <div id="deals-chart">
              <ReactApexChart
                options={sCol2}
                series={sCol2.series}
                type="bar"
                height={275}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
