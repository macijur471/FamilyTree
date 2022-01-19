import React, { useState } from "react";
import { ReactComponent as DeleteUserIcon } from "images/deleteUser.svg";
import IconButton from "components/shared/IconButton";
import { useDrop } from "react-dnd";
import DeletePersonModal from "../DeletePersonModal";

const DeleteButton = React.forwardRef<HTMLDivElement>(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [, drop] = useDrop(() => ({
    accept: "person",
    drop: (item: { id: string; name: string }) => {
      setIsModalVisible(true);
      setId(item.id);
      setName(item.name);
    },
  }));
  return (
    <>
      <IconButton color="red" icon={<DeleteUserIcon />} optRef={drop} />
      {isModalVisible && (
        <DeletePersonModal
          id={id}
          name={name}
          close={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
});

export default DeleteButton;
