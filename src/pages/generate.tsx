import React from "react";
import type { NextPage } from "next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { api } from "@/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
const Generate: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    shape: "",
    style: "",
    numberOfIcons: "1",
  });

  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    },
  });

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
    setForm({
      prompt: "",
      color: "",
      shape: "",
      style: "",
      numberOfIcons: "1",
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
