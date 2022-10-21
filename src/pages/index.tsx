import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const [modalFiles, setModalFiles] =
    useState<(File & { preview: string })[]>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setModalFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = modalFiles?.map((file) => (
    <div
      key={file.name}
      className="inline-flex h-20 w-20 justify-center rounded border-2 border-solid border-gray-300 p-1"
    >
      <div className="flex overflow-hidden">
        <img
          src={file.preview}
          className="block h-full w-auto"
          alt={`${file.name}`}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 dark:bg-gray-700">
        <div className="">Upload1</div>
        <section>
          <div
            {...getRootProps({
              className: "dropzone",
            })}
            className="flex w-full items-center justify-center focus:outline-none focus-visible:ring"
          >
            <label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Accepts: SVG, PNG, JPG, JEPG, WEBP, GIF
                </p>
              </div>
              <input {...getInputProps()} />
            </label>
          </div>
          <aside className="mt-2 flex max-h-60 flex-wrap gap-4 overflow-y-auto">
            {thumbs}
          </aside>
        </section>
      </main>
    </>
  );
};

export default Home;
