import React from "react";

const Drawer = ({ handleFormStep }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4">
          {/* Sidebar content here */}
          <li>
            <button onClick={() => handleFormStep(1)}>Inventory</button>
          </li>
          <li>
            <button onClick={() => handleFormStep(2)}>Add Product</button>
          </li>
          <li>
            <button onClick={() => handleFormStep(3)}>Sales History</button>
          </li>
          <li>
            <button onClick={() => handleFormStep(4)}>POS</button>
          </li>
          <li>
            <button onClick={() => handleFormStep(6)}>Customers</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
