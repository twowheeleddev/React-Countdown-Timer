// components/wrappers/ResponsiveWrapper.jsx

import PropTypes from "prop-types";

const ResponsiveWrapper = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb", // Light background
        color: "#1f2937", // Light text color
        padding: "0 1rem", // Small padding
      }}
      className="dark:bg-gray-900 dark:text-gray-200 sm:px-6 md:px-8"
    >
      {children}
    </div>
  );
};

ResponsiveWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResponsiveWrapper;
