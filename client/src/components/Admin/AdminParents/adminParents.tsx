
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance.ts";
import { AdminParentsTable } from "../AdminParentsTable/adminParentsTable.tsx";
import AdminDashboardNav from "../AdminDashboardNav/adminDashboardNav.tsx";
import "./adminParents.css";


export const AdminParents = () => {
  const [parentsData, setparentsData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getParentsData();
  }, [])

  const getParentsData = async () => {
    try {
      const res = await axiosInstance.get('/getAllParents')
      if (res.status === 200) {
        const data = res.data?.data;
        setparentsData(data);
      }else {
        throw new Error("Something went wrong");
      }

    }catch(err) {
      setError("Something went wrong. Please check your internet connection");
    }
  }

  return (
    <div className="admin-users-container ">
      <AdminDashboardNav />
      <div className="admin-user-title-container">
        <h1 className="admin-users-title"> All Parents</h1>
        
      </div>
      <div className="admin-users-search-container">
      
      </div>

      <div className="mt-5">
        <AdminParentsTable parentsData={parentsData}/>
      </div>
    </div>
  );
};