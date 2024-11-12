import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../backend/api";
import styles from "./Employee.module.css";
import { useEffect, useState } from "react";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const data = filteredData || employees;
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getEmployees()
      .then((data) => setEmployees(data.employees))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  function isEqual(str1, str2) {
    return str1.trim().toLowerCase().includes(str2.trim().toLowerCase());
  }
  function filterData(e) {
    const data = employees.filter((emp) =>
      isEqual(
        `${emp.name} ${emp.email} ${emp.designation} ${emp.course} ${emp.course} ${emp.mobile}`,
        e.target.value
      )
    );
    setFilteredData(data);
  }
  async function handleDelete(id) {
    try {
      const response = await deleteEmployee(id);
      if (!response.success) alert(response.message);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }
  function formatDate(date) {
    return new Date(date)
      .toLocaleDateString("en-Gb", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
      .replaceAll(" ", "-");
  }
  if (loading) return <h1 className={styles.alert}>Loading...</h1>;
  if (!loading && employees.length === 0)
    return (
      <div className={styles.alert}>
        <h1>No employees Found</h1>
        <button onClick={() => navigate("/create")}>Create employee</button>
      </div>
    );
  return (
    <div className={styles.employeeWrapper}>
      <div>
        <div>
          <p>Total count: {employees?.length}</p>
          <button onClick={() => navigate("/create")}>Create Employee</button>
        </div>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            onChange={filterData}
            type="text"
            id="search"
            placeholder="Enter text here"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>unique id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                <a
                  download={`profile_${emp.name}.jpg`}
                  href={emp.image}
                  target="_blank"
                >
                  <img src={emp.image} alt="profile" width={150} height={150} />
                </a>
              </td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.mobile}</td>
              <td>{emp.designation}</td>
              <td>{emp.gender}</td>
              <td>{emp.course}</td>
              <td>{formatDate(emp.createdAt)}</td>
              <td>
                <button onClick={() => navigate(`/edit/${emp.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
