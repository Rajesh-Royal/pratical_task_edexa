import React from "react";
import { projectTheme } from "../Config/ProjectTheme";

const Filters = React.memo(({ sortUsersProfiles }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-2 my-5 px-4 py-2 ${projectTheme.background} rounded-lg shadow-md `}>
      <h4 className="text-white font-semibold">Filters</h4>
      <div
        className="filter-container flex items-center space-x-4 justify-between"
        title="Sort customers data in Ascending or descending order">
        <form>
          <select
            name="sort table"
            className={`p-1 focus:outline-none dark:text-gray-200 dark:bg-gray-500 bg-transparent text-white border ${projectTheme.borderColor} dark:border-gray-500 shadow-md`}
            onChange={(e) => sortUsersProfiles(e.target.value)}>
            <option value="name" className="text-gray-400 dark:text-gray-200">
              Sort By: Name
            </option>
            <option value="age" className="text-gray-400 dark:text-gray-200">
              Sort By: Age
            </option>
          </select>
        </form>
      </div>
    </div>
  );
});

Filters.displayName = "Filters";

export default Filters;
