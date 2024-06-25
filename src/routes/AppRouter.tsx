import { Suspense, lazy } from "react";
// lottie animation
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
// suspence fallback
import PageSuspenceFallback from "@components/feedback/PageSuspenceFallback/PageSuspenceFallback";
// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
  () => import("@layouts/ProfileLayout/ProfileLayout")
);
// pages
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const Home = lazy(() => import("@pages/Home"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Categories = lazy(() => import("@pages/Categories"));
const Cart = lazy(() => import("@pages/Cart"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));
import Error from "@pages/Error";
import ProtectedRoutes from "@components/Auth/ProtectedRoutes";
// protected route

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="loading" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenceFallback>
            <Home />
          </PageSuspenceFallback>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspenceFallback>
            <Cart />{" "}
          </PageSuspenceFallback>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoutes>
            <PageSuspenceFallback>
              <Wishlist />
            </PageSuspenceFallback>
          </ProtectedRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenceFallback>
            <Categories />
          </PageSuspenceFallback>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspenceFallback>
            <Products />
          </PageSuspenceFallback>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSuspenceFallback>
            <AboutUs />
          </PageSuspenceFallback>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspenceFallback>
            <Login />
          </PageSuspenceFallback>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspenceFallback>
            <Register />
          </PageSuspenceFallback>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <PageSuspenceFallback>
              <ProfileLayout />
            </PageSuspenceFallback>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenceFallback>
                <Account />
              </PageSuspenceFallback>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSuspenceFallback>
                <Orders />
              </PageSuspenceFallback>
            ),
          },
        ],
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
