import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CreateEmployee.module.css";
import validator from "validator";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../backend/api";

const initialState = {
  name: "",
  email: "",
  course: "",
  designation: "",
  image: "",
  mobile: "",
  gender: "",
};

function CreateEmployee() {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        if (key === "image") !id && (newErrors[key] = `${key} is required`);
        else newErrors[key] = `${key} is required`;
      } else {
        if (key === "email" && !validator.isEmail(formData[key]))
          newErrors[key] = "Email is invalid";
        if (key === "mobile" && !/^[6-9]{1}[0-9]{9}$/.test(formData[key]))
          newErrors[key] = "Invalid mobile number";
        if (
          key === "image" &&
          !id &&
          !["png", "jpg"].includes(
            formData[key].name.split(".").pop().toLowerCase()
          )
        )
          newErrors[key] = "Image should be either in jpg or png format";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});
    const Form = new FormData();
    for (const key in formData) Form.append(key, formData[key]);
    setSubmitting(true);
    let response;
    if (id) response = await updateEmployee(Form, id);
    else response = await createEmployee(Form);
    if (!response.success) {
      alert(response.message);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    alert(`Employee ${id ? "edited" : "created"} successfully`);
    setFormData(initialState);
    navigate("/employees");
  }
  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: files ? files[0] : value,
    }));
  }

  useEffect(() => {
    if (id)
      getEmployeeById(id)
        .catch(console.error)
        .then((data) => {
          if (!data) {
            navigate("/");
            return;
          }
          const { name, email, gender, designation, mobile, course, image } =
            data.employee || {};
          setFormData((form) => ({
            ...form,
            name,
            email,
            image,
            mobile,
            gender,
            course,
            designation,
          }));
        });
  }, [id, navigate]);
  return (
    <div className={styles.formWrapper}>
      {id && (
        <a href={formData.image} target="_blank">
          <img className={styles.profile} src={formData.image} alt="profile" />
        </a>
      )}
      <h1>{id ? "Edit employee" : "Create employee"}</h1>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.loginForm}
        method="post"
      >
        {Object.keys(initialState).map((field, index) => (
          <div className={styles.inputField} key={index}>
            <label htmlFor={field}>{field}</label>
            <div>
              {field === "gender" ? (
                <select
                  disabled={submitting}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              ) : field === "designation" ? (
                <select
                  disabled={submitting}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              ) : field === "image" ? (
                <input
                  disabled={submitting}
                  type="file"
                  id={field}
                  name={field}
                  onChange={handleChange}
                />
              ) : field === "course" ? (
                <select
                  id={field}
                  disabled={submitting}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                >
                  <option value="">Select course</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="BSc">BSc</option>
                </select>
              ) : (
                <input
                  disabled={submitting}
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              )}
              <p className={styles.error}>{error[field] && error[field]}</p>
            </div>
          </div>
        ))}
        {!id ? (
          <button disabled={submitting}>
            {submitting ? "Creating..." : "Create"}
          </button>
        ) : (
          <button disabled={submitting}>
            {submitting ? "Updating..." : "Update"}
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateEmployee;
