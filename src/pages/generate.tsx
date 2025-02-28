import React from "react";
import type { NextPage } from "next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { api } from "@/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import ChatComponent from "@/components/Char";
import ChatApp from "@/components/Char";
const Generate: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    shape: "",
    style: "",
    numberOfIcons: "1",
  });

  const generateIcon = api.generate.generateIcon.useMutation();

  const session = useSession();
  const isloggedIn = !!session.data?.user;

  const [error, setError] = useState("");

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    generateIcon.mutate({
      prompt: form.prompt,
      // ...form,
      // numberOfIcons: parseInt(form.numberOfIcons),
    });
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }
  return (
    <MaxWidthWrapper>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        {/* <ChatComponent prompt={form.prompt} />
         */}
        <ChatApp />
        {!isloggedIn ? (
          <Button
            onClick={() => {
              signIn().catch(console.error);
            }}
          >
            Signin
          </Button>
        ) : (
          <Button
            onClick={() => {
              signOut().catch(console.error);
            }}
          >
            Signout
          </Button>
        )}

        <form>
          <Input
            type="text"
            placeholder="prompt"
            onChange={updateForm("prompt")}
          />
          <Button type="submit" onClick={handleFormSubmit}>
            submit{" "}
          </Button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default Generate;
