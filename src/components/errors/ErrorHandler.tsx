import { Link, useLocation } from "react-router";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();

  return (
    <div className="fixed inset-0 flex items-center justify-center p-5 w-full">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-red-100 p-4">
          <div className="rounded-full stroke-red-600 bg-red-200 p-4">
            <svg
              className="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16C22 13.7909 20.2091 12 18 12H6Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17 16L22 21M22 16L17 21"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="mt-5 text-[36px] font-bold lg:text-[50px]">
          {statusCode} - {title}
        </h2>
        <p className="mt-5 text-slate-600 lg:text-lg">
          Something went wrong while loading{" "}
          <span className="font-semibold">{pathname}</span>.
          <br />
          Please try again later.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorHandler;
