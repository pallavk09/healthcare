import { lazy } from "react";
const Container = lazy(() => import("../../common/Container"));

const StudentDashboard = () => {
  return (
    <Container>
      <h6>Student Dashboard</h6>
    </Container>
  );
};

export default StudentDashboard;
