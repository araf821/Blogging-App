"use client";

import { FC, useCallback, useState } from "react";
import { SafePost } from "../types";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { motion } from "framer-motion";

interface SearchBarProps {
  posts: SafePost[] | null;
}

const Search: FC<SearchBarProps> = ({ posts }) => {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([])

  const router = useRouter();
  const params = useSearchParams();

  const handleSearch = useCallback(async () => {
    let currentQuery: any = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      keyword,
    };

    const url = queryString.stringifyUrl(
      {
        url: "/explore",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [params, keyword, router]);

  return (
    <section>
      {/* Search bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        className="relative mb-8 w-full"
      >
        <input
          id="name"
          type="text"
          placeholder=" "
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          className={`peer w-full rounded-md border-2 px-4 py-3`}
          required
        />
        <label
          className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
        >
          Search
        </label>
      </motion.div>

      {/* Search results */}
      <div
        className={`grid w-full origin-top grid-cols-3 gap-6 transition duration-1000 `}
      >
        {posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <Button label="Click me" onClick={handleSearch} />
    </section>
  );
};

export default Search;
