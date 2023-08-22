import { useUsersContext } from "../../contexts/UsersContext";
import Item from "./Item";

const List = () => {
  const { filterdUsers, error, isLoading, setSelectedUser } = useUsersContext();
  if (error) {
    return <>{`${error.name}: ${error.message}`}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  if (!filterdUsers?.length) {
    return <>No users found.</>;
  }
  const handleClick = (user: User) => {
    setSelectedUser(user);
  };
  return (
    <ul>
      {filterdUsers.map((user) => (
        <Item key={user.id} user={user} onClick={() => handleClick(user)} />
      ))}
    </ul>
  );
};

export default List;
