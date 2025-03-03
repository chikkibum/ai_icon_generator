import React, { useState } from "react";
import type { NextPage } from "next";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { api } from "@/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Generate: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const [imagesUrl, setImagesUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      if (data.result?.imageBase64) {
        setImagesUrl(data.result.imageBase64); // Store the Base64 image
      }
      setIsLoading(false);
    },
    onError(error) {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const session = useSession();
  const isloggedIn = !!session.data?.user;

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    generateIcon.mutate({ prompt: form.prompt });
    setForm({ prompt: "" });
  }

  function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ prompt: e.target.value });
  }

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-12">
        <h1 className="text-3xl font-bold">AI Icon Generator</h1>

        {!isloggedIn ? (
          <Button onClick={() => signIn().catch(console.error)}>Sign In</Button>
        ) : (
          <div className="flex w-full max-w-md flex-col items-center gap-6">
            <div className="flex w-full justify-between">
              <p>
                Logged in as{" "}
                {session.data?.user.name || session.data?.user.email}
              </p>
              <Button
                variant="outline"
                onClick={() => signOut().catch(console.error)}
              >
                Sign Out
              </Button>
            </div>

            <form onSubmit={handleFormSubmit} className="w-full space-y-4">
              <div>
                <label
                  htmlFor="prompt"
                  className="mb-1 block text-sm font-medium"
                >
                  Prompt
                </label>
                <Input
                  id="prompt"
                  type="text"
                  placeholder="Describe the icon you want..."
                  value={form.prompt}
                  onChange={updateForm}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !form.prompt.trim()}
              >
                {isLoading ? "Generating..." : "Generate Icon"}
              </Button>
            </form>

            {error && (
              <div className="text-sm text-red-500">Error: {error}</div>
            )}

            {imagesUrl && (
              <div className="mt-6 w-full">
                <h2 className="mb-4 text-xl font-semibold">Generated Icon</h2>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <div className="relative h-64 w-64">
                    {/* Render Base64 image */}
                    <Image
                      src={imagesUrl}
                      alt="Generated Icon"
                      className="h-full w-full object-contain"
                      width={20}
                      height={29}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = imagesUrl;
                        link.download = `icon-${Date.now()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Generate;
