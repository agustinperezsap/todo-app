async function fetchUsers() {
  try {
    console.log("Loading users...");

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Network error");
    }

    const users = await response.json();
    console.log("Users loaded:");
    users
      .map((users) => users.name.toUpperCase())
      .forEach((name) => {
        console.log(name);
      });
  } catch (error) {
    await new Promise((r) => setTimeout(r, 2000));
    console.error("Something failed:", error.message);
  }
}
async function fetchWithRetry(retries = 1) {
  try {
    await fetchUsers();
  } catch (err) {
    if (retries > 0) {
      console.log("Retrying...");
      return fetchWithRetry(retries - 1);
    }
    throw err;
  }
}
async function fetchUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Network error");
  }

  return response.json();
}

async function fetchMultipleUsers(ids) {
  const promises = ids.map(id => fetchUser(id));

  const results = await Promise.allSettled(promises);

  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("OK:", result.value.name);
    } else {
      console.log("FAILED:", result.reason.message);
    }
  });
}

fetchMultipleUsers([1, 2, 999]);
fetchWithRetry();
