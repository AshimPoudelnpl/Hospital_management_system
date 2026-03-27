import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetDepartmentsQuery } from "@Redux/features/departmentSlice.js";
import Skeleton from "../shared/Skeleton";
import Card from "../shared/Card";
import CTASection from "../ui/CTASection";
import { FaHospital } from "react-icons/fa";

const Departments = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  const { data: departmentsData, isLoading, error } = useGetDepartmentsQuery();

  if (isLoading) {
    return <Skeleton variant="card" count={6} />;
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 text-lg text-red-600">Failed to load departments.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const departments = Array.isArray(departmentsData)
    ? departmentsData
    : departmentsData?.data || [];
  const filteredDepartments = departments.filter(
    (dept) => !selectedId || String(dept.id) === selectedId,
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-blue-900">
            Our Departments
          </h1>
          <p className="text-lg text-gray-600">
            Specialized medical departments with expert care and modern facilities
          </p>
        </div>

        

        {filteredDepartments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDepartments.map((dept, index) => {
              const services = Array.isArray(dept.services) ? dept.services : [];
              const serviceTags = services.slice(0, 4).map(s => s.service_name);
              if (services.length > 4) {
                serviceTags.push(`+${services.length - 4} more`);
              }
              const description = dept.description || "Specialized care with experienced clinicians and dedicated services.";
              const fullDescription = dept.head_doctor 
                ? `Department Head: ${dept.head_doctor}

${description}`
                : description;

              return (
                <Card
                  key={dept.id || index}
                  image={dept.image}
                  title={dept.name}
                  description={fullDescription}
                  tags={serviceTags}
                  icon={FaHospital}
                  buttonText="Book Appointment"
                  onButtonClick={() => navigate(`/book-appointment?department_id=${dept.id}`)}
                  className={selectedId === String(dept.id) ? "" : ""}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500">
            <FaHospital className="mx-auto mb-4 text-5xl text-gray-300" />
            <p>No departments available at the moment.</p>
          </div>
        )}

        <div className="mt-16">
          <CTASection
            title="Need More Information?"
            description="Contact our departments directly for specialized consultation and appointments"
            buttons={[
              {
                label: "Book Appointment",
                path: "/book-appointment",
                variant: "primary",
              },
              { label: "Contact Us", path: "/contact", variant: "success" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Departments;
