import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATEALBUM, SIGNUP } from "../../Utilities/constantLinks";

const CommunityRBAC: React.FC = () => {
  const AuthReducer = useSelector((state: any) => state.auth);
  const userData = useSelector((state: any) => state.userData?.data || null);
  const navigate = useNavigate();
  return (
    <div className="px-6 lg:px-12 pt-12">
      <div className="rounded-[30px] bg-premiumgreen p-10">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {!AuthReducer ? (
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Want to share your plant journey?
              </h1>

              <p className="text-lg text-gray-700">
                Sign up now to get exclusive access to{" "}
                <span className="font-semibold">upload 5 albums for FREE</span>.
              </p>

              <p className="text-lg text-gray-700">
                Join our growing community of creators!
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {userData && !userData?.isSeller ? (
                <>
                  <h1 className="text-4xl font-bold mb-2 leading-tight">
                    Congrats! You can now upload up to
                  </h1>
                  <h1 className="text-4xl font-black">5 Albums for FREE.</h1>
                </>
              ) : (
                <h1 className="text-4xl font-bold mb-2 leading-tight">
                  Congrats! You can create unlimited albums
                </h1>
              )}
            </div>
          )}
          <button
            className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-green-500 transition-colors"
            onClick={() => {
              scrollTo(0, 0);
              !AuthReducer ? navigate(SIGNUP) : navigate(CREATEALBUM);
            }}
          >
            {!AuthReducer ? "Get Started" : "Create Album"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityRBAC;
