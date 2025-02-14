import React from "react";
import { pb } from "./pocketbaseClient";
import { useNavigate } from "react-router-dom";

export async function handleLogout(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  try {
    setLoading(true);

    pb.authStore.clear();

    navigate("/");
    
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
  } catch (error) {
    console.error("Logout Error:", error);
  } finally {
    setLoading(false);
  }
}
