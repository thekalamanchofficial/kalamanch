// "use client";
// import { useEffect, useState } from "react";
// import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs";

// export default function Verification() {
//   const [verificationStatus, setVerificationStatus] = useState("loading");

//   const { handleEmailLinkVerification } = useClerk();

//   useEffect(() => {
//     async function verify() {
//       try {
//         await handleEmailLinkVerification({
//           redirectUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`,
//           redirectUrlComplete: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/`,
//         });

//         setVerificationStatus("verified");
//       } catch (err) {
//         // Verification has failed.
//         let status = "failed";
//         if (isEmailLinkError(err) && err.code === EmailLinkErrorCode.Expired) {
//           status = "expired";
//         }
//         setVerificationStatus(status);
//       }
//     }
//     verify();
//   }, []);

//   if (verificationStatus === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (verificationStatus === "failed") {
//     return <div>Email link verification failed</div>;
//   }

//   if (verificationStatus === "expired") {
//     return <div>Email link expired</div>;
//   }

//   return (
//     <div>Successfully signed up. Return to the original tab to continue.</div>
//   );
// }
