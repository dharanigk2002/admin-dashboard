const BASE_URL = "https://admin-dashboard-xso8.onrender.com";

export async function getCurrentUser() {
  const response = await fetch(`${BASE_URL}/api/admin/valid`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function login(formData) {
  const response = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/api/admin/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function getEmployees() {
  const response = await fetch(`${BASE_URL}/api/employee/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function deleteEmployee(id) {
  const response = await fetch(`${BASE_URL}/api/employee/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function createEmployee(employee) {
  const response = await fetch(`${BASE_URL}/api/employee/create`, {
    method: "POST",
    body: employee,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function updateEmployee(employee, id) {
  const response = await fetch(`${BASE_URL}/api/employee/update/${id}`, {
    method: "PUT",
    body: employee,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

export async function getEmployeeById(id) {
  const response = await fetch(`${BASE_URL}/api/employee/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}
