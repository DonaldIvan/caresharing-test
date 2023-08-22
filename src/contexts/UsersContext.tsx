import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";

interface State {
  users: User[] | null;
  filterdUsers: User[];
  isLoading: boolean;
  error: Error | null;
  selectedUser: User | null;
}

interface ContextValue extends State {
  setFilteredUsers: (filterdUsers: State["filterdUsers"]) => void;
  setSelectedUser: (user: State["selectedUser"]) => void;
}

enum Action {
  SetIsLoading = "SET_ISLOADING",
  SetData = "SET_DATA",
  SetFilteredUsers = "SET_FILTERED_USERS",
  SetSelectedUser = "SET_SELECTED_USER",
}

type SetIsLoading = {
  type: Action.SetIsLoading;
  payload: State["isLoading"];
};

type SetData = {
  type: Action.SetData;
  payload: Omit<State, "selectedUser">;
};

type SetFilteredUsers = {
  type: Action.SetFilteredUsers;
  payload: State["filterdUsers"];
};
type SetSelectedUser = {
  type: Action.SetSelectedUser;
  payload: State["selectedUser"];
};

type Actions = SetIsLoading | SetData | SetFilteredUsers | SetSelectedUser;

const initialState: State = {
  users: null,
  filterdUsers: [],
  isLoading: false,
  error: null,
  selectedUser: null,
};

const reducer = (state: State, { type, payload }: Actions): State => {
  switch (type) {
    case Action.SetIsLoading: {
      return { ...state, isLoading: payload };
    }
    case Action.SetData: {
      return { ...state, ...payload };
    }
    case Action.SetFilteredUsers: {
      return { ...state, filterdUsers: payload };
    }
    case Action.SetSelectedUser: {
      return { ...state, selectedUser: payload };
    }
    default: {
      throw new Error(`Unhandled action: ${type}`);
    }
  }
};

const UsersContext = createContext<ContextValue>({
  ...initialState,
  setFilteredUsers: () => {},
  setSelectedUser: () => {},
});

const randomGrade = (min = 70, max = 100): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: Action.SetIsLoading,
        payload: true,
      });
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) throw new Error(response.statusText);
        const users = (await response.json()) as State["users"];
        dispatch({
          type: Action.SetData,
          payload: {
            isLoading: false,
            error: null,
            users,
            filterdUsers:
              users?.map((user) => ({
                ...user,
                grades: [
                  {
                    subject: "Math",
                    grade: randomGrade(),
                  },
                  {
                    subject: "Science",
                    grade: randomGrade(),
                  },
                  {
                    subject: "Programming",
                    grade: randomGrade(),
                  },
                  {
                    subject: "PE",
                    grade: randomGrade(),
                  },
                  {
                    subject: "History",
                    grade: randomGrade(),
                  },
                ],
              })) ?? [],
          },
        });
      } catch (error) {
        dispatch({
          type: Action.SetData,
          payload: {
            isLoading: false,
            error: {
              name: "Whooops",
              message: "something went wrong",
            },
            users: null,
            filterdUsers: [],
          },
        });
      }
    };
    fetchData();
  }, []);
  const setFilteredUsers = (users: State["filterdUsers"]) => {
    dispatch({
      type: Action.SetFilteredUsers,
      payload: users,
    });
  };
  const setSelectedUser = (user: State["selectedUser"]) => {
    dispatch({
      type: Action.SetSelectedUser,
      payload: user,
    });
  };
  const value = {
    ...state,
    setFilteredUsers,
    setSelectedUser,
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsersContext must be used within a UsersContext");
  }
  return context;
};

export { UsersProvider, useUsersContext };
