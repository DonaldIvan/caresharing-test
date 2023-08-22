import Filter from "./components/Filter";
import SelectedUser from "./components/SelectedUser";
import List from "./components/Users/List";
import { UsersProvider } from "./contexts/UsersContext";

const App = () => {
  return (
    <>
      <h1>Users Insights </h1>
      <UsersProvider>
        <Filter />
        <List />
        <SelectedUser />
      </UsersProvider>
    </>
  );
};

export default App;
