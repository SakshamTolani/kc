import { Box } from "@chakra-ui/react";
import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

// function Rating({ value, text, color }) {
//   return (
//     <div className="rating">
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 1
//               ? "fas fa-star"
//               : value >= 0.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 2
//               ? "fas fa-star"
//               : value >= 1.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 3
//               ? "fas fa-star"
//               : value >= 2.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 4
//               ? "fas fa-star"
//               : value >= 3.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>
//       <span>
//         <i
//           style={{ color }}
//           className={
//             value >= 5
//               ? "fas fa-star"
//               : value >= 4.5
//               ? "fas fa-star-half-alt"
//               : "far fa-star"
//           }
//         ></i>
//       </span>
//       <span>{text && text}</span>
//     </div>
//   );
// }
function Rating({ rating, numReviews, rootProps }) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={"#3182ce"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return (
              <BsStarHalf
                key={i}
                style={{ marginLeft: "1" }}
                color={"#3182ce"}
              />
            );
          }
          return (
            <BsStar key={i} style={{ marginLeft: "1" }} color={"#3182ce"} />
          );
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="md" {...rootProps}>
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

export default Rating;
