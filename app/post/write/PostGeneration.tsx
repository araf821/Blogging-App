"use client";

import { FC, useState } from "react";
import { AiTwotoneCopy } from "react-icons/ai";
import TemplateLoader from "./TemplateLoader";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import axios from "axios";

interface PostGenerationProps {
  title: string;
}

const PostGeneration: FC<PostGenerationProps> = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleRateLimiting = () => {
    toast(
      "Template cannot be generated at this time.\n\nWe are working on resolving this issue as soon as possible!",
      {
        duration: 6000,
      }
    );
  };

  const handleGenerate = async () => {
    if (title.replaceAll(" ", "").length < 10) {
      toast.error("Please come up with a longer title.");
      return; // Return early, no state update
    }

    setIsLoading(true);
    const response = await axios.post(`/api/openai/generateTemplate`, {
      title: title,
    });

    if (!response) {
      // Handle the case where data is undefined
      setIsLoading(false);
      handleRateLimiting();
      return;
    }

    if (!response.data) {
      handleRateLimiting();
    } else {
      setContent(response.data);
    }

    setIsLoading(false);
  };

  const handleCopy = (generatedContent: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(generatedContent)
        .then(() => {
          toast.success("Copied!");
        })
        .catch((error) => {
          console.error("Clipboard write failed:", error);
          toast.error("Copy failed. Please try again.");
        });
    } else {
      // Handle case where clipboard API is not available
      console.error("Clipboard API is not available.");
      toast.error("Copy not supported on this device.");
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-md bg-white shadow-md">
      <p className="rounded-t-md bg-zinc-800 px-3 py-1.5 text-center font-josefin font-semibold text-bg md:text-lg">
        Need a starting template for your post?
      </p>
      <div className="mb-2 mt-1 space-y-4 px-3 py-1.5">
        <p className="balance text-center text-sm tracking-tight text-neutral-900 md:text-base">
          Based on the title you&rsquo;ve given above, you can generate a short
          template for your post if you&rsquo;d like.
        </p>
        <Button
          className=""
          small
          disabled={isLoading}
          label="Generate Post"
          onClick={handleGenerate}
        />

        {/* Loader for the content generation */}
        {isLoading && <TemplateLoader />}

        {/* Generated Content */}
        {content ? (
          <>
            <textarea
              name="generatedContent"
              id="generatedContent"
              cols={10}
              rows={10}
              disabled
              value={content}
              className="w-full resize-none overflow-x-hidden rounded-md border-2 border-zinc-800 px-3 py-1.5 text-accent disabled:bg-gray-800 md:text-lg"
            />
            <Button
              icon={AiTwotoneCopy}
              label="Copy Content"
              onClick={() => handleCopy(content)}
              small
              special
              className="hover:-translate-y-1"
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PostGeneration;
