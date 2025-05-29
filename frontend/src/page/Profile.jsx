import React,{useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  Shield,
  Image,
  ExternalLink,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import ChangePasswordPopup from "../components/ChangePasswordPopup";

 import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";

const Profile = () => {
  const { authUser,forgotPassword,resetSuccessfully } = useAuthStore();
    const { submissions, getAllSubmissions } = useSubmissionStore();
      useEffect(() => {
        getAllSubmissions();
      }, [getAllSubmissions]);
     const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
     const handleChangePassword = async (data) => {
       await forgotPassword(data);
     };
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-10 px-4 md:px-8 w-full">
      {/* Header with back button */}
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="btn btn-circle btn-ghost">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                  {authUser.image ? (
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-center ml-4.5 mt-10.5 md:text-6xl">
                      {authUser.name ? authUser.name.charAt(0) : "U"}
                    </span>
                  )}
                </div>
              </div>

              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{authUser.name}</h2>
                <div className="badge badge-primary mt-2">{authUser.role}</div>
              </div>
            </div>

            <div className="divider"></div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title">Email</div>
                <div className="stat-value text-lg break-all">
                  {authUser.email}
                </div>
              </div>

              {/* User ID */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title">User ID</div>
                <div className="stat-value text-sm break-all">
                  {authUser.id}
                </div>
              </div>

              {/* Role Status */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title">Role</div>
                <div className="stat-value text-lg">{authUser.role}</div>
                <div className="stat-desc">
                  {authUser.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </div>

              {/* Profile Image Status */}
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-figure text-primary">
                  <Image className="w-8 h-8" />
                </div>
                <div className="stat-title">Profile Image</div>
                <div className="stat-value text-lg">
                  {authUser.image ? "Uploaded" : "Not Set"}
                </div>
                <div className="stat-desc">
                  {authUser.image
                    ? "Image available"
                    : "Upload a profile picture"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-end mt-6">
              <button className="btn btn-outline btn-primary">
                Edit Profile
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Change Password
              </button>
              <ChangePasswordPopup
                isOpen={isChangePasswordOpen} //value of clicked button
                onClose={() => setIsChangePasswordOpen(false)}
                onSubmit={handleChangePassword} //sending data to backend
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" bg-base-200 p-4 ">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-primary mb-4 md:mb-0">
                Total Submissions
              </h3>
              <Link
                to={`/submissions`}
                className="btn btn-sm btn-outline btn-primary"
              >
                <ExternalLink size={14} className="mr-1" />
                View All Submissions
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6 mb-3">
            <div className="stat bg-base-100 shadow">
              <div className="stat-title">Total</div>
              <div className="stat-value">{submissions?.length}</div>
            </div>
            <div className="stat bg-base-100 shadow ">
              <div className="stat-title">Accepted</div>
              <div className="stat-value text-success">
                {submissions?.filter((s) => s.status === "Accepted").length}
              </div>
            </div>
          </div>
        </div>

        <ProblemSolvedByUser />

        {!resetSuccessfully && <PlaylistProfile />}
      </div>

      {/* PLaylist created by the user and their actions */}
    </div>
  );
};

export default Profile;
