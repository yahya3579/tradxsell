// import React from "react";
// import { useNavigate } from "react-router-dom";
// import bg from "./bkg.png";
// import "./Getstarted.css";


// export default function GetStarted() {
//   const navigate = useNavigate();

//   const handleSignUpClick = () => {
//     navigate("/register");
//   };
//   const handlebecomesellerclick =()=>{
//     navigate("/seller-register");
//   };


//   return (
//     <div className="container-fluid p-0"  >
//       <div style={{padding:"40px"}}>
//         <div
//           className="bg-image"
//           style={{
           
//             backgroundImage: `url(${bg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "bottom",
//             height: "400px", 
//             position: "relative",
//             borderRadius: "20px",
//           }}
//         >
//           <div
//             className=""
//             style={{
//               backgroundColor: "rgba(251, 84, 32, 0.62)", 
//               height: "100%",
//               width: "100%",
//               position: "absolute",
//               borderRadius: "20px",
//               top: 0,
//               left: 0,
//             }}
//           />
//           <div
//             className="content position-relative text-center text-white"
//             style={{
//               position: "relative",
//               zIndex: 1,
//               paddingTop: "100px",
              
//             }}
//           >
//             <h1 className="fw-bold">Ready to get started?</h1>
//             <p className="p-3 fw-bolder responsive-text">
//             Uncover millions of products from reputable suppliers—sign up now!
//             </p>
//             <button className="btn rounded-2 custombutton fw-bold py-3"  style={{color:"white",
//             border: "1px solid white",
//     background: "linear-gradient(90deg, #1E1E1E 0%, #310D03 100%)"
//   }} onClick={handleSignUpClick}>Become Buyer</button>{" "}
//             <button className="btn rounded-2 custombutton fw-bold py-3"  style={{color:"white",
//             margin:"40px",
//              border: "1px solid white",
//     background: "linear-gradient(90deg, #1E1E1E 0%, #310D03 100%)"
//   }} onClick={handlebecomesellerclick}>Become Seller</button>{" "}
//           </div>
//         </div>
//         </div>
//     </div>
//   );
// }




import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "./bkg.png";
import "./Getstarted.css";

export default function GetStarted() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register");
  };
  const handlebecomesellerclick = () => {
    navigate("/seller-register");
  };

  return (
    <div className="container-fluid p-0">
      <div style={{ padding: "20px" }}>
        <div
          className="bg-image"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "400px",
            position: "relative",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(251, 84, 32, 0.62)",
              height: "100%",
              width: "100%",
              position: "absolute",
              borderRadius: "20px",
              top: 0,
              left: 0,
            }}
          />
          <div
            className="content position-relative text-center text-white d-flex flex-column align-items-center justify-content-center"
            style={{
              position: "relative",
              zIndex: 1,
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <h1 className="fw-bold mb-3">Ready to get started?</h1>
            <p className="p-3 fw-bolder responsive-text">
              Uncover millions of products from reputable suppliers—sign up now!
            </p>
            <div className="button-group mt-3 d-flex flex-wrap justify-content-center gap-1 gap-sm-3">
              <button
                className="btn rounded-2 custombutton fw-bold"
                style={{
                  color: "white",
                  border: "1px solid white",
                  background: "linear-gradient(90deg, #1E1E1E 0%, #310D03 100%)",
                }}
                onClick={handleSignUpClick}
              >
                Become Buyer
              </button>
              <button
                className="btn rounded-2 custombutton fw-bold"
                style={{
                  color: "white",
                  border: "1px solid white",
                  background: "linear-gradient(90deg, #1E1E1E 0%, #310D03 100%)",
                }}
                onClick={handlebecomesellerclick}
              >
                Become Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
