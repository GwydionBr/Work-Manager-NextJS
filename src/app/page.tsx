import { getUsers } from "@/db";

export default async function Home() {

  const tester = await getUsers();

  return (
    <div>
      <h1>Main Page</h1>
      <ul>
        {tester.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
