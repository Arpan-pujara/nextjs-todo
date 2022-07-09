import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { db } from "../firebase";
import Todo from "./Todo";

const TodoList = ({ todosProps }) => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setTodos(JSON.parse(todosProps));
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "todos");

    const q = query(
      collectionRef,
      where("email", "==", currentUser?.email),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          id={todo.id}
          key={todo.id}
          title={todo.title}
          detail={todo.detail}
          timestamp={todo.timestamp}
        />
      ))}
    </div>
  );
};

export default TodoList;
