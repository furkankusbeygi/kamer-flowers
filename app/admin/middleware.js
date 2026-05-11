export { default } from "next-auth/middleware";

export const config = { 
  matcher: ["/admin/:path*"] // /admin altındaki her yeri korumaya al
};