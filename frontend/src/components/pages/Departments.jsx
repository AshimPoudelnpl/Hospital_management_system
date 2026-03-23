import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetDepartmentsQuery } from "@Redux/features/departmentSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import DepartmentCard from "../ui/DepartmentCard";
import CTASection from "../ui/CTASection";
import { FaHospital } from "react-icons/fa";

const Departments = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const deptRefs = useRef({});

  const { data: departmentsData, isLoading, error } = useGetDepartmentsQuery();

  // Scroll to selected department when id param changes
  useEffect(() => {
    if (selectedId && deptRefs.current[selectedId]) {
      setTimeout(() => {
        deptRefs.current[selectedId].scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [selectedId, departmentsData]);

  if (isLoading) return <Skeleton variant="card" count={3} />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 text-lg mb-4">Failed to load departments.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  const departments = departmentsData || [];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Our Departments</h1>
          <p className="text-gray-600 text-lg">
            Specialized medical departments with expert care and modern facilities
          </p>
        </div>

{departments.length > 0 ? (
          <div className="space-y-8">
            {departments
              .filter((dept) => !selectedId || String(dept.id) === selectedId)
              .map((dept, index) => (
                <div key={dept.id || index} ref={(el) => (deptRefs.current[String(dept.id)] = el)}>
                  <DepartmentCard
                    department={dept}
                    isSelected={selectedId === String(dept.id)}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaHospital className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No departments available at the moment.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Need More Information?"
            description="Contact our departments directly for specialized consultation and appointments"
            buttons={[
              { label: "Book Appointment", path: "/book-appointment", variant: "primary" },
              { label: "Contact Us", path: "/contact", variant: "success" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Departments;
