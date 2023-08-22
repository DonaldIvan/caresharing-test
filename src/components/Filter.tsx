import { ChangeEvent, useState } from "react";
import { useUsersContext } from "../contexts/UsersContext";

const Filter = () => {
  const { setFilteredUsers, users } = useUsersContext();
  const [searchString, setSearchString] = useState("");

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchString(value);
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setFilteredUsers(users ?? []);
    } else {
      setFilteredUsers(
        users?.filter((user) =>
          user.name.toLowerCase().includes(trimmedValue.toLowerCase())
        ) ?? []
      );
    }
  };
  return (
    <input
      type="text"
      value={searchString}
      onChange={handleChange}
      placeholder="Search user"
    />
  );
};

export default Filter;
