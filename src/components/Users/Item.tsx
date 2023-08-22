import { FC } from "react";

interface Props {
  user: User;
  onClick: () => void;
}

const Item: FC<Props> = ({ user, onClick }) => {
  return (
    <li style={{ cursor: "pointer" }} onClick={() => onClick()}>
      {user.name}
    </li>
  );
};

export default Item;
