import React, { FC } from "react"
import PageTransition from "../defaults/PageTransition";
import AdminBottomNav from "../admin/defaults/AdminBottomNav";

interface AdminContainerProps {
    children: React.ReactNode;
    active: string;
}
const AdminContainer: FC<AdminContainerProps> = ({ children, active }) => {
  return (
    <div className="min-h-screen lg:w-[450px] bg-[#fafafa] mx-auto">
      <PageTransition active={active}>
        <div>{children}</div>
      </PageTransition>
      <AdminBottomNav active={active} />
    </div>
  )
}

export default AdminContainer
