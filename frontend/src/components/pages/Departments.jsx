import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetDepartmentsQuery } from "@Redux/features/departmentSlice.js";
import Loading from "../shared/Loading";
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

  if (isLoading) return <Loading />;

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
                <div
                  key={dept.id || index}
                  ref={(el) => (deptRefs.current[String(dept.id)] = el)}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } ${
                    selectedId === String(dept.id)
                      ? "ring-2 ring-blue-500 shadow-xl"
                      : "hover:shadow-xl"
                  }`}
                >
                  {/* Image */}
                  <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={dept.image ? `/${dept.image}` : "/default-dept.jpg"}
                      alt={dept.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-3">{dept.name}</h3>
                      {dept.description && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>
                      )}

                      {dept.services && dept.services.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Services Offered:</h4>
                          <div className="flex flex-wrap gap-2">
                            {dept.services.map((s) => (
                              <span
                                key={s.id}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {s.service_name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {dept.head_doctor && (
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Department Head:</span> {dept.head_doctor}
                        </p>
                      )}
                      <button
                        onClick={() => navigate("/book-appointment")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm ml-auto"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
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
        <div className="mt-16 bg-blue-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Need More Information?</h3>
          <p className="mb-6 text-blue-200">
            Contact our departments directly for specialized consultation and appointments
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/book-appointment")}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
