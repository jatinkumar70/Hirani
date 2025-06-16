// import React from "react";
// import { Box, Grid, Typography, Button, Container, Stack } from "@mui/material";

// const OurServices = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",
//         padding: "8rem",
//       }}>
//       <Grid container spacing={4}>
//         {/* Sidebar Section */}
//         <Grid
//           item
//           xs={12}
//           md={3}
//           sx={{ position: "relative", paddingLeft: "1rem" }}>
//           <Stack
//             spacing={2}
//             sx={{
//               fontSize: "1rem",
//               fontWeight: "400",
//               mt: 5,
//             }}>
//             <Typography
//               sx={{
//                 color: "#fff",
//                 fontWeight: "bold",
//                 fontSize: "1.1rem",
//                 textShadow: "0px 0px 10px #fff",
//               }}>
//               Our Services
//             </Typography>
//             <Typography sx={{ color: "#888", fontWeight: 500 }}>
//               Problem Solving
//             </Typography>
//             <Typography sx={{ color: "#888", fontWeight: 500 }}>
//               Our Architecture
//             </Typography>
//             <Typography sx={{ color: "#888", fontWeight: 500 }}>
//               Work Process
//             </Typography>
//             <Typography sx={{ color: "#888", fontWeight: 500 }}>
//               Management Process
//             </Typography>
//             <Typography sx={{ color: "#888", fontWeight: 500 }}>
//               Our Tools
//             </Typography>
//           </Stack>

//           {/* Vertical Line & Progress Circles */}
//           <Box
//             sx={{
//               position: "absolute",
//               left: "20%",
//               top: "30%",
//               height: "80%",
//               borderLeft: "4px solid #aaa",
//               zIndex: 1,
//             }}
//           />
//           <Stack
//             spacing={1.5}
//             sx={{
//               position: "absolute",
//               left: "19%",
//               top: "8%",
//             }}>
//             {[1, 2, 3, 4].map((_, i) => (
//               <Box
//                 key={i}
//                 sx={{
//                   width: "12px",
//                   height: "12px",
//                   borderRadius: "50%",
//                   backgroundColor: i === 0 ? "#fff" : "#777",
//                 }}
//               />
//             ))}
//           </Stack>
//         </Grid>

//         {/* Main Content Section */}
//         <Grid item xs={12} md={9}>
//           <Box
//             sx={{
//               backgroundColor: "#222",
//               padding: "3rem",
//               borderRadius: "8px",
//               maxWidth: "550px",
//               position: "relative",
//               boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.2)",
//               zIndex: 2,
//             }}>
//             {/* Title */}
//             <Typography
//               variant="h2"
//               fontWeight="bold"
//               sx={{
//                 fontSize: "3.5rem",
//                 lineHeight: "1.1",
//               }}>
//               Our{" "}
//               <Typography
//                 component="span"
//                 sx={{ color: "#aaa", fontSize: "3.5rem" }}>
//                 Services.
//               </Typography>
//             </Typography>

//             {/* Description */}
//             <Typography
//               sx={{
//                 marginTop: "1.5rem",
//                 fontSize: "1rem",
//                 lineHeight: "1.8",
//                 color: "#bbb",
//               }}>
//               Software development is the dynamic creation, testing, and
//               maintenance of applications, integrating coding, problem-solving,
//               and collaboration.
//             </Typography>

//             {/* Explore Button */}
//             <Button
//               variant="contained"
//               sx={{
//                 mt: 3,
//                 backgroundColor: "#a100ff",
//                 "&:hover": { backgroundColor: "#7a00d1" },
//                 borderRadius: "20px",
//                 fontSize: "0.9rem",
//                 padding: "0.7rem 1.8rem",
//               }}>
//               Explore All Services
//             </Button>

//             {/* Secondary Buttons */}
//             <Box sx={{ display: "flex", gap: 2, marginTop: "2rem" }}>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   color: "#fff",
//                   borderColor: "#fff",
//                   borderRadius: "20px",
//                   "&:hover": { borderColor: "#aaa", color: "#aaa" },
//                 }}>
//                 Contact
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   color: "#fff",
//                   borderColor: "#fff",
//                   borderRadius: "20px",
//                   "&:hover": { borderColor: "#aaa", color: "#aaa" },
//                 }}>
//                 Download Brochure
//               </Button>
//             </Box>
//           </Box>

//           {/* Background Text */}
//           <Typography
//             sx={{
//               position: "absolute",
//               bottom: "5%",
//               right: "5%",
//               fontSize: "6rem",
//               fontWeight: "bold",
//               color: "#a100ff",
//               opacity: "0.2",
//               textTransform: "uppercase",
//               zIndex: 0,
//               lineHeight: "0.9",
//               letterSpacing: "4px",
//             }}>
//             Simply <br /> The Best
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default OurServices;
