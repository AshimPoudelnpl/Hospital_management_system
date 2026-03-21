import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAppointmentsQuery } from "../../Redux/features/appointmentSlice";
import { useGetContactsQuery } from "../../Redux/features/contactSlice";
import { useGetDepartmentsQuery } from "../../Redux/features/departmentSlice";
import { useGetDoctorsQuery } from "../../Redux/features/doctorSlice";
import { useGetNoticesQuery } from "../../Redux/features/noticeSlice";
import { useGetServicesQuery } from "../../Redux/features/servicesSlice";

const PageCard = ({ className = "", children }) => (
  <section className={`rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-sm ${className}`}>
    {children}
  </section>
);

const MiniStatCard = ({ label, value, accent, onClick, icon }) => (
  <button
    type="button"
    onClick={onClick}
    className="group rounded-[24px] border border-slate-200 bg-slate-50/90 p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-slate-900">{value ?? "--"}</p>
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
        {icon}
      </div>
    </div>
    <p className="mt-4 text-sm text-slate-500 group-hover:text-slate-700">Open {label.toLowerCase()}</p>
  </button>
);

const QuickAction = ({ title, description, onClick, accent }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-[24px] p-4 text-left text-white shadow-sm transition hover:-translate-y-0.5 ${accent}`}
  >
    <p className="text-sm font-semibold">{title}</p>
    <p className="mt-2 text-xs leading-5 text-white/80">{description}</p>
  </button>
);

const AppointmentRow = ({ appointment, badgeClass }) => (
  <div className="grid grid-cols-[1.2fr_1.1fr_1fr_auto] items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
    <div>
      <p className="text-sm font-semibold text-slate-800">{appointment.patient_name || "Unknown patient"}</p>
      <p className="text-xs text-slate-500">{appointment.doctor_name || "Doctor pending"}</p>
    </div>
    <p className="text-sm text-slate-600">{appointment.department_name || "General"}</p>
    <p className="text-sm text-slate-600">{appointment.appointment_date || "Date pending"}</p>
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeClass}`}>
      {appointment.status || "pending"}
    </span>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { data: doctors } = useGetDoctorsQuery();
  const { data: departments } = useGetDepartmentsQuery();
  const { data: services } = useGetServicesQuery();
  const { data: appointments } = useGetAppointmentsQuery();
  const { data: notices } = useGetNoticesQuery();
  const { data: contacts } = useGetContactsQuery();

  const stats = useMemo(
    () => [
      {
        label: "Doctors",
        value: doctors?.length,
        path: "/admin/doctors",
        accent: "bg-sky-100 text-sky-600",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a5 5 0 0 1 5 5c0 1.55-.7 2.94-1.8 3.85A7.98 7.98 0 0 1 20 18v1a1 1 0 1 1-2 0v-1a6 6 0 0 0-12 0v1a1 1 0 1 1-2 0v-1a7.98 7.98 0 0 1 4.8-7.15A4.98 4.98 0 0 1 7 7a5 5 0 0 1 5-5Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          </svg>
        ),
      },
      {
        label: "Departments",
        value: departments?.length,
        path: "/admin/departments",
        accent: "bg-violet-100 text-violet-600",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.41a2 2 0 0 0-.59-1.41l-4.41-4.41A2 2 0 0 0 15.59 3H4Zm10 1.5V9h4.5" />
          </svg>
        ),
      },
      {
        label: "Services",
        value: services?.length,
        path: "/admin/services",
        accent: "bg-emerald-100 text-emerald-600",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 11h-6V5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2Z" />
          </svg>
        ),
      },
      {
        label: "Appointments",
        value: appointments?.length,
        path: "/admin/appointments",
        accent: "bg-amber-100 text-amber-600",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm12 8H5v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7Z" />
          </svg>
        ),
      },
      {
        label: "Notices",
        value: notices?.length,
        path: "/admin/notices",
        accent: "bg-rose-100 text-rose-600",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a7 7 0 0 0-7 7v3.59l-.7.7A1 1 0 0 0 5 15h14a1 1 0 0 0 .7-1.71l-.7-.7V9a7 7 0 0 0-7-7Zm0 20a3 3 0 0 0 2.83-2H9.17A3 3 0 0 0 12 22Z" />
          </svg>
        ),
      },
      {
        label: "Contacts",
        value: contacts?.length,
        path: "/admin/contacts",
        accent: "bg-cyan-100 text-cyan-600",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16a2 2 0 0 1 2 2v.59l-10 6.25L2 6.59V6a2 2 0 0 1 2-2Zm18 4.76-9.47 5.92a1 1 0 0 1-1.06 0L2 8.76V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.76Z" />
          </svg>
        ),
      },
    ],
    [appointments?.length, contacts?.length, departments?.length, doctors?.length, notices?.length, services?.length]
  );

  const recentAppointments = (appointments || []).slice(0, 5);

  const statusColor = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-sky-100 text-sky-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700",
  };

  const statusSummary = useMemo(() => {
    const source = appointments || [];
    return [
      {
        label: "Pending",
        value: source.filter((item) => item.status === "pending").length,
        tone: "bg-amber-50 text-amber-700",
      },
      {
        label: "Confirmed",
        value: source.filter((item) => item.status === "confirmed").length,
        tone: "bg-sky-50 text-sky-700",
      },
      {
        label: "Completed",
        value: source.filter((item) => item.status === "completed").length,
        tone: "bg-emerald-50 text-emerald-700",
      },
      {
        label: "Cancelled",
        value: source.filter((item) => item.status === "cancelled").length,
        tone: "bg-rose-50 text-rose-700",
      },
    ];
  }, [appointments]);

  const departmentHighlights = useMemo(() => (departments || []).slice(0, 6), [departments]);
  const noticePreview = useMemo(() => (notices || []).slice(0, 3), [notices]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] p-4 md:p-6">
      <div className="space-y-5">
        <PageCard className="overflow-hidden bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_55%,_#38bdf8_100%)] text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-sky-100">Hospital Command Center</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back, {user?.email || "Admin"}</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-sky-100/90">
                Monitor staff, appointments, patient messages, and operational updates from one place.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-xl">
              <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-100/75">Today Queue</p>
                <p className="mt-3 text-3xl font-semibold">{appointments?.length || 0}</p>
                <p className="mt-1 text-xs text-sky-100/80">Registered appointments</p>
              </div>
              <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-100/75">Departments</p>
                <p className="mt-3 text-3xl font-semibold">{departments?.length || 0}</p>
                <p className="mt-1 text-xs text-sky-100/80">Active care units</p>
              </div>
              <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-100/75">Patient Messages</p>
                <p className="mt-3 text-3xl font-semibold">{contacts?.length || 0}</p>
                <p className="mt-1 text-xs text-sky-100/80">Awaiting follow-up</p>
              </div>
            </div>
          </div>
        </PageCard>

        <div className="grid gap-5 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">
            <PageCard>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                  <p className="text-sm text-slate-500">Primary hospital metrics with direct navigation.</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/admin/profile")}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Manage profile
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {stats.map((stat) => (
                  <MiniStatCard key={stat.label} {...stat} onClick={() => navigate(stat.path)} />
                ))}
              </div>
            </PageCard>

            <div className="grid gap-5 lg:grid-cols-2">
              <PageCard>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Departments</h2>
                    <p className="text-sm text-slate-500">Quick glance at hospital units.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/admin/departments")}
                    className="text-sm font-medium text-blue-600"
                  >
                    View all
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {departmentHighlights.length === 0 ? (
                    <div className="col-span-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                      No departments available.
                    </div>
                  ) : (
                    departmentHighlights.map((department, index) => (
                      <div
                        key={department.id || index}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2 4 6v6c0 5 3.4 9.74 8 11 4.6-1.26 8-6 8-11V6l-8-4Zm1 6h3v2h-3v3h-2v-3H8V8h3V5h2v3Z" />
                          </svg>
                        </div>
                        <p className="mt-3 line-clamp-1 text-sm font-semibold text-slate-800">
                          {department.name || department.department_name || `Department ${index + 1}`}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Clinical unit</p>
                      </div>
                    ))
                  )}
                </div>
              </PageCard>

              <PageCard>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                    <p className="text-sm text-slate-500">Common admin workflows.</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <QuickAction
                    title="Add Doctor"
                    description="Register a new specialist and assign them to a department."
                    onClick={() => navigate("/admin/doctors")}
                    accent="bg-[linear-gradient(135deg,_#0f766e,_#14b8a6)]"
                  />
                  <QuickAction
                    title="Publish Notice"
                    description="Share operational updates with staff and patients."
                    onClick={() => navigate("/admin/notices")}
                    accent="bg-[linear-gradient(135deg,_#b45309,_#f59e0b)]"
                  />
                  <QuickAction
                    title="Review Appointments"
                    description="Track new bookings, confirmations, and service demand."
                    onClick={() => navigate("/admin/appointments")}
                    accent="bg-[linear-gradient(135deg,_#1d4ed8,_#38bdf8)]"
                  />
                  <QuickAction
                    title="Check Contacts"
                    description="Respond to patient and visitor enquiries."
                    onClick={() => navigate("/admin/contacts")}
                    accent="bg-[linear-gradient(135deg,_#7c3aed,_#c084fc)]"
                  />
                </div>
              </PageCard>
            </div>

            <PageCard>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Recent Appointments</h2>
                  <p className="text-sm text-slate-500">Latest patient bookings across the hospital.</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/admin/appointments")}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Open schedule
                </button>
              </div>

              <div className="space-y-3">
                {recentAppointments.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No appointments yet.</div>
                ) : (
                  recentAppointments.map((appointment) => (
                    <AppointmentRow
                      key={appointment.id}
                      appointment={appointment}
                      badgeClass={statusColor[appointment.status] || "bg-slate-100 text-slate-700"}
                    />
                  ))
                )}
              </div>
            </PageCard>
          </div>

          <div className="space-y-5">
            <PageCard className="bg-[linear-gradient(180deg,_#eff6ff_0%,_#ffffff_100%)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Appointment Status</h2>
                  <p className="text-sm text-slate-500">Live appointment distribution.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 5v5.59l3.7 3.7-1.4 1.41L11 13V7Z" />
                  </svg>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {statusSummary.map((item) => (
                  <div key={item.label} className="rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-600">{item.label}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.value}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          item.label === "Pending"
                            ? "bg-amber-400"
                            : item.label === "Confirmed"
                              ? "bg-sky-500"
                              : item.label === "Completed"
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                        }`}
                        style={{
                          width: `${appointments?.length ? Math.max((item.value / appointments.length) * 100, 8) : 8}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PageCard>

            <PageCard>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Hospital Feed</h2>
                  <p className="text-sm text-slate-500">Latest published notices.</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/admin/notices")}
                  className="text-sm font-medium text-blue-600"
                >
                  View notices
                </button>
              </div>

              <div className="space-y-3">
                {noticePreview.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No notices available.</div>
                ) : (
                  noticePreview.map((notice, index) => (
                    <div key={notice.id || index} className="rounded-[22px] border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {notice.title || notice.subject || `Notice ${index + 1}`}
                      </p>
                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
                        {notice.description || notice.message || "No description available."}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </PageCard>

            <PageCard className="bg-[linear-gradient(135deg,_#0f172a,_#1e293b)] text-white">
              <p className="text-sm font-medium text-slate-300">Admin Snapshot</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-semibold">{doctors?.length || 0}</p>
                  <p className="mt-1 text-xs text-slate-300">Doctors listed</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-semibold">{services?.length || 0}</p>
                  <p className="mt-1 text-xs text-slate-300">Services active</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-semibold">{contacts?.length || 0}</p>
                  <p className="mt-1 text-xs text-slate-300">Contact requests</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-semibold">{notices?.length || 0}</p>
                  <p className="mt-1 text-xs text-slate-300">Notice posts</p>
                </div>
              </div>
            </PageCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
