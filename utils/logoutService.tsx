import React from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export async function handleLogout(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: ReturnType<typeof useNavigate>
) {
  setLoading(true);
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error.message;
  }
  if (!error) {
    navigate("/")
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setLoading(false);
    
  }
}
