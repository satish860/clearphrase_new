import { authMiddleware } from "@clerk/nextjs";
 

export default authMiddleware({
    publicRoutes: ["/","/phraser","/api","/api/phraser"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};