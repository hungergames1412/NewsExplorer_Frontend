export const authorize = () => {
  return new Promise((resolve) => {
    resolve({ token: "test-token-12345" });
  });
};

export const checkToken = () => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "Sarah", email: "sarah@example.com", _id: "123" },
    });
  });
};