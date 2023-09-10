import { useState } from "react";
import { Client } from "@notionhq/client";
import dotenv from 'dotenv';

import "./App.css";

dotenv.config()

const notion = new Client({
  auth: process.env.VITE_NOTION_KEY ,
});
const databaseId = process.env.VITE_NOTION_DATABASE_ID ;

function App() {
  const [task, setTask] = useState("");

  const handleKeyDown = (event: { key: string; }) => { 
    if (event.key === "Enter") {
      handleClick();
    }
  };


  const handleClick = async () => {

    const response = await notion.pages.create({
      parent: { database_id: databaseId! },
      properties: {
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: task,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    setTask(" ")
  };

  return (
    <>
      <div>
        <h1>Save a task to Notion</h1>
        <div>
          <input
            type="text"
            id="task"
            name="task"
            min="0"
            step="0.01"
            placeholder="Enter a Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button onClick={handleClick}>Save Task</button>
      </div>
    </>
  );
}

export default App;
