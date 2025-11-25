/* ============================================
   STORAGE.JS — Handles all LocalStorage logic
   ============================================ */

/* -----------------------------
   Save a NEW request
   ----------------------------- */
function saveRequest(data) {
  let requests = JSON.parse(localStorage.getItem("requests")) || [];

  const newRequest = {
    id: Date.now(),            // unique ID
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    category: data.category || "",
    priority: data.priority || "",
    subject: data.subject || "",
    description: data.description || "",
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  requests.push(newRequest);
  localStorage.setItem("requests", JSON.stringify(requests));

  return newRequest.id; // return ID so page can redirect/use it
}

/* -----------------------------
   Get ALL requests
   ----------------------------- */
function getAllRequests() {
  return JSON.parse(localStorage.getItem("requests")) || [];
}

/* -----------------------------
   Get ONE request by ID
   ----------------------------- */
function getRequestById(id) {
  let requests = JSON.parse(localStorage.getItem("requests")) || [];
  return requests.find(r => r.id == id);
}

/* -----------------------------
   Update an existing request
   ----------------------------- */
function updateRequest(updated) {
  let requests = JSON.parse(localStorage.getItem("requests")) || [];

  const index = requests.findIndex(r => r.id == updated.id);
  if (index === -1) return false;

  requests[index] = updated;
  localStorage.setItem("requests", JSON.stringify(requests));
  return true;
}

/* -----------------------------
   Close a request  (mark as Resolved)
   ----------------------------- */
function closeRequest(id) {
  let req = getRequestById(id);
  if (!req) return false;

  req.status = "Resolved";
  req.closedAt = new Date().toISOString();
  return updateRequest(req);
}

/* -----------------------------
   (Optional) Save logged-in user
   ----------------------------- */
function loginUser(email) {
  localStorage.setItem("loggedInUser", JSON.stringify({
    email,
    loggedInAt: new Date().toISOString()
  }));
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");
}
