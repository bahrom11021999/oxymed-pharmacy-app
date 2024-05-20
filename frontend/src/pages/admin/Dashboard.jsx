import React from "react";
import Header from "../../components/Header";
import { useSummary } from "../../hooks/admin/useSummary";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const { summary, isSummaryLoading } = useSummary();

  if (isSummaryLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 p-4">
      <Header />

      <Banner />

      <div className="flex flex-col gap-2">
        <h2 className="text-2 xl font-normal">Summary</h2>
        <div className="flex flex-col gap-4">
          <div className="relative flex flex-col rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex w-full flex-col gap-2">
                <h2 className="text-2xl font-normal">Users</h2>

                <span className="h-[1px] w-full bg-slate-200"></span>
                <div className="flex items-center justify-between">
                  <p className="text-md font-light">Total Users:</p>
                  <p className="text-md font-light">{summary.users}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex w-full flex-col gap-2">
                <h2 className="text-2xl font-normal">Medicines</h2>

                <span className="h-[1px] w-full bg-slate-200"></span>
                <div className="flex items-center justify-between">
                  <p className="text-md font-light">Total Medicines:</p>
                  <p className="text-md font-light">{summary.medicines}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const Banner = () => {
  return (
    <img
      src="https://www.imedicalapps.com/wp-content/uploads/2018/02/iStock-465420910.jpg"
      alt="Banner"
      className="h-44 w-full rounded-md object-cover shadow-lg sm:h-80"
    />
  );
};
