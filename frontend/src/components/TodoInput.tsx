import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type TodotInputProps = {
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    text: string,
    setText: (val: string) => void,
  ) => void;
};

export default function TodoInput({ onSubmitHandler }: TodotInputProps) {
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e, text, setText);
      }}
      className="flex gap-4"
    >
      <Input onChange={(e) => setText(e.target.value)} value={text} />
      <Button>Add new task</Button>
    </form>
  );
}
