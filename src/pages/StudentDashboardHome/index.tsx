import { useOutletContext } from "react-router-dom";
import StudentProfileDashboard from "../../components/Dashboard/StudentProfileDashboard";

const StudentDashboardHome = () => {
  const { _userId, _phone }: { _userId: string; _phone: string } =
    useOutletContext();
  return <StudentProfileDashboard userId={_userId!} phone={_phone!} />;
};

export default StudentDashboardHome;
