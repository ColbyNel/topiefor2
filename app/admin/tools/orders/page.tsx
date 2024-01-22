"use client";
import AdminHead from "@/components/AdminHead";
import AdminMenu from "@/components/AdminMenu";
import OrderFilter from "@/components/OrderFilter";
import OrderList from "@/components/OrderList";

const orders = () => {
  return (
    <>
      <AdminHead />
      <div className="admin-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-content">
          <OrderFilter />
          <OrderList />
        </div>
      </div>
    </>
  );
};
export default orders;
