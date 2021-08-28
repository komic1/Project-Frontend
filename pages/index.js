import Head from "next/head";
import Image from "next/image";
import classes from "../styles/home.module.css";
import { useRef } from "react";

export default function Home() {
  const enteredName = useRef();
  const enteredDescription = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const newTitle = enteredName.current.value;
    const newDescription = enteredDescription.current.value;

    const reqBody = {
      title: newTitle,
      description: newDescription,
    };
    //console.log(newTitle,newDescription)
    fetch("http://localhost:8080/add", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
