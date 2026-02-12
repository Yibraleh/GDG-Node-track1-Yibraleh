export const getUsers = (req, res) => {
  res.status(200).json([
    { id: 1, name: "John" },
    { id: 2, name: "Alice" },
    {id:3, name: "baby"}
  ]);
};

export const createUser = (req, res) => {
  const { name } = req.body;

  res.status(201).json({
    message: "User created",
    user: { name }
  });
};
