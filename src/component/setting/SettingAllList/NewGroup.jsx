
import { useState } from "react";

const NewGroup = () => {
    const [groupName, setGroupName] = useState("");

    const [users, setUsers] = useState([
        { id: 1, name: "Rahul", selected: false },
        { id: 2, name: "Amit", selected: false },
        { id: 3, name: "Rohit", selected: false },
        { id: 4, name: "Vikas", selected: false },
        { id: 5, name: "Ankit", selected: false },
    ]);

    const [search, setSearch] = useState("");

    // Select user
    const selectUser = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? { ...user, selected: !user.selected }
                    : user
            )
        );
    };

    // Create group
    const createGroup = (e) => {
        e.preventDefault();

        const selectedUsers = users.filter(
            (user) => user.selected
        );

        const data = {
            groupName,
            members: selectedUsers,
        };

        console.log(data);
    };

    // Search
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>

            {/* Container */}
            <div className="flex h-[90vh] w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center gap-4 bg-[#008069] px-5 py-4 text-white">

                    <button

                        className="text-2xl hover:scale-110"
                    >
                        ←
                    </button>

                    <div>
                        <h2 className="text-lg font-semibold">
                            New Group
                        </h2>

                        <p className="text-xs text-white/80">
                            Add participants
                        </p>
                    </div>

                </div>

                {/* Body */}
                <form
                    onSubmit={createGroup}
                    className="flex flex-1 flex-col overflow-hidden"
                >

                    {/* Group Image */}
                    <div className="flex justify-center py-6">

                        <button
                            type="button"
                            className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-5xl hover:bg-gray-300"
                        >
                            📷
                        </button>

                    </div>

                    {/* Group Name */}
                    <div className="px-5">

                        <input
                            type="text"
                            placeholder="Group name"
                            value={groupName}
                            onChange={(e) =>
                                setGroupName(e.target.value)
                            }
                            className="w-full border-b-2 border-gray-300 px-2 py-3 outline-none focus:border-[#008069]"
                        />

                    </div>

                    {/* Search */}
                    <div className="px-5 py-4">

                        <div className="flex items-center rounded-lg bg-gray-100 px-3">

                            <span>🔍</span>

                            <input
                                type="text"
                                placeholder="Search contacts"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full bg-transparent px-3 py-3 outline-none"
                            />

                        </div>

                    </div>

                    {/* Users */}
                    <div className="flex-1 overflow-y-auto px-3">

                        <p className="px-3 py-2 text-sm font-semibold text-gray-500">
                            Contacts
                        </p>

                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => selectUser(user.id)}
                                className="flex cursor-pointer items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
                            >

                                {/* Avatar */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-xl">
                                    👤
                                </div>

                                {/* Name */}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Available
                                    </p>
                                </div>

                                {/* Checkbox */}
                                <div
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${user.selected
                                        ? "border-[#008069] bg-[#008069] text-white"
                                        : "border-gray-400"
                                        }`}
                                >
                                    {user.selected && "✓"}
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* Create Button */}
                    <div className="border-t bg-gray-50 p-4">

                        <button
                            type="submit"
                            disabled={
                                !groupName.trim() ||
                                !users.some((user) => user.selected)
                            }
                            className="w-full rounded-full bg-[#008069] py-3 font-semibold text-white hover:bg-[#006e5c] disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                            Create Group
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default NewGroup;

