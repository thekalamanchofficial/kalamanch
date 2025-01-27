import prisma from "../db";

const getUserDetails = async (userEmail: string) => {
  const userDetails = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!userDetails) {
    throw new Error("User not found");
  }
  return userDetails;
};

export default getUserDetails;
