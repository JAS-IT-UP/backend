import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const baseUrl = "/api/posts";

export const createPost = async ({
  postPicture,
  projectDescription,
  materialId,
  userId,
}) => {
  const data = await fetchHandler(
    "/api/createPost",
    getPostOptions({ postPicture, projectDescription, materialId, userId })
  );
  console.log(data, "this is my adapter post")
  return data;
};

export const getAllPosts = async () => {
  const data = await fetchHandler(baseUrl);
  console.log(data, "this is my adapter post")
  return data || [];
};

export const getPost = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const deletePost = async (id) => {
  const data = await fetchHandler(`${baseUrl}/${id}`, deleteOptions());
  return data;
};

export const updatePost = async ({ postPicture, projectDescription }) =>
fetchHandler(`${baseUrl}/${postId}`, getPatchOptions({ postPicture, projectDescription }));
