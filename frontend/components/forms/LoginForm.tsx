export async function LoginForm() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>
      <form action="" className="flex flex-col w-1/4">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" className="outline-1 rounded-sm" />

        <label htmlFor="password">Password:</label>
        <input type="text" id="password" className="outline-1 rounded-sm" />

        <button
          type="submit"
          className="bg-gray-400 hover:bg-gray-600 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
