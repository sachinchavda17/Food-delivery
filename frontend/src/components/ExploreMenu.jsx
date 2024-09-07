// import React from "react";
// import { menu_list } from "../assets/frontend_assets/assets"; // Assuming the menu list data is available

// const ExploreMenu = () => {
//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="container mx-auto text-center">
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
//           Explore Our Menu
//         </h1>
//         <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
//           Choose from a wide variety of delectable dishes crafted with the
//           finest ingredients and culinary expertise to elevate your dining
//           experience.
//         </p>

//         {/* Horizontal scrolling menu */}
//         <div className="relative mx-auto">
//           <div className="flex overflow-x-scroll scrollbar-hide gap-8 px-4 md:px-12">
//             {menu_list.map((item, index) => (
//               <div key={index} className="flex-none  rounded-lg px-4 py-2 ">
//                 <img
//                   src={item.menu_image}
//                   alt={item.menu_name}
//                   className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                   {item.menu_name}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ExploreMenu;
import React from "react";
import { menu_list } from "../assets/frontend_assets/assets"; // Assuming you have the menu list data

const ExploreMenu = () => {
  return (
    <div className="bg-gray-100 py-12 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Explore our menu
      </h2>
      <p className="text-lg text-gray-600 mb-10">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise.
      </p>

      <div className="flex overflow-x-scroll hide-scrollbar space-x-8 px-6">
        {menu_list.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-36  p-4  rounded-lg ">
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <p className="text-lg font-medium text-gray-800">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
