import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const HolidayPage = ({ customHolidays }) => {
  const { holidayName } = useParams();

  const holidayDetails = {
    thanksgiving: {
      title: "Thanksgiving",
      description:
        "A time to give thanks, enjoy a feast, and spend time with family.",
      funFact: "The first Thanksgiving lasted three days!",
    },
    christmas: {
      title: "Christmas",
      description: "A season of giving, joy, and celebration with loved ones.",
      funFact: "Christmas trees originated in Germany!",
    },
    newyear: {
      title: "New Year",
      description:
        "Celebrate the start of a new year with hope and excitement.",
      funFact: "New Year's resolutions date back to ancient Babylon!",
    },
  };

  // Format the holiday name to match the keys in holidayDetails
  const formattedHolidayName = holidayName.toLowerCase().replace(/-/g, "");

  // Check for custom holiday
  const customHoliday = customHolidays.find(
    (holiday) =>
      holiday.name.toLowerCase().replace(/\s+/g, "-") ===
      holidayName.toLowerCase()
  );

  // Determine the holiday content
  const holidayContent = holidayDetails[formattedHolidayName] ||
    (customHoliday && {
      title: customHoliday.name,
      description: `${customHoliday.name} is a special event added by you!`,
      funFact: "You can make every day a special day with custom holidays!",
    }) || {
      title: "Unknown Holiday",
      description: "We couldn't find details for this holiday.",
      funFact: "Create your own holiday to make it special!",
    };

  return (
    <div className="holiday-page min-h-screen bg-neonYellow dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold text-neonPink dark:text-neonBlue mb-8">
        {holidayContent.title}
      </h1>
      <p className="prose dark:prose-invert text-center text-xl mb-6">
        {holidayContent.description}
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-300 mb-6 italic">
        Fun Fact: {holidayContent.funFact}
      </p>
      <Link
        to="/"
        className="bg-neonGreen dark:bg-neonPurple text-white py-3 px-6 rounded-lg shadow-md hover:bg-limeGreen dark:hover:bg-electricBlue transition transform hover:scale-105"
      >
        Return to Main Page
      </Link>
    </div>
  );
};

HolidayPage.propTypes = {
  customHolidays: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};

export default HolidayPage;
