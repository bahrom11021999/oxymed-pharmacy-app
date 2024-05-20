import React, { useState } from "react";
import Header from "../../components/Header";
import { useUsers } from "../../hooks/admin/useUsers";
import Loader from "../../components/Loader";

const Users = () => {
  const { users, isLoading} = useUsers();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return <Loader />;
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.username.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Header />

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search for medicine"
          className="rounded border border-teal-400 p-2"
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2 xl font-normal">Medicines</h2>
        <div className="flex flex-col gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="relative flex flex-col rounded-md bg-white p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex w-full flex-col gap-2">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-normal">{user.username}</h2>
                    </div>
                    <p className="text-md font-light">{user.role}</p>
                  </div>
                  <span className="h-[1px] w-full bg-slate-200"></span>
                  <div className="flex items-center justify-between">
                    <p className="text-md font-light">Created At:</p>
                    <p className="text-md font-light">
                      {user.createdAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-xl">No users yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
